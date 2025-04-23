require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

const app = express();
const PORT = process.env.PORT || 5000;

const { v4: uuidv4 } = require('uuid');

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN, 
  },
});

const { WebClient } = require('@slack/web-api');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const SLACK_CHANNEL = process.env.SLACK_CHANNEL_ID;


const BUCKET = process.env.AWS_S3_BUCKET;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

// Rate Limiting (prevents spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});
app.use(limiter);


// Generate a pre-signed URL for screenshot uploads
app.post('/get-upload-url', async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ message: 'Missing file info' });
  }

  const extension = path.extname(fileName);
  const key = `screenshots/${uuidv4()}${extension}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: fileType
  });

  try {
    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 120 });
    res.json({ uploadURL, key });
    console.log('Upload URL:', uploadURL);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate upload URL' });
  }
});


// Submit the report metadata
app.post('/submitreport', express.json(), async (req, res) => {
  console.log('Received report submission:', req.body); // Add this line
  try {
    const { name, email, bugDescription, impact, screenshotKey } = req.body;

    if (!name || !email || !bugDescription) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const reportData = {
      name,
      email,
      bugDescription,
      impact,
      createdAt: new Date().toISOString(),
      screenshotUrl: screenshotKey ? `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${screenshotKey}` : null,
      status: 'open'
    };

    const reportKey = `reports/${uuidv4()}.json`;

    const reportCommand = new PutObjectCommand({
      Bucket: BUCKET,
      Key: reportKey,
      Body: JSON.stringify(reportData),
      ContentType: 'application/json'
    });
    
    await s3.send(reportCommand);
    

    console.log('Report data prepared:', reportData); 
    console.log('Report successfully saved to S3'); 


    await s3.send(reportCommand);

  //Slack notification
    let signedScreenshotUrl = null;

    if (screenshotKey) {
      const screenshotCommand = new GetObjectCommand({
        Bucket: BUCKET,
        Key: screenshotKey,
      });

      signedScreenshotUrl = await getSignedUrl(s3, screenshotCommand, { expiresIn: 60 * 2 }); // 2 mins
    }

    const slackMessage = `🐞 *New Bug Report Submitted!*\n
    *Name:* ${name}
    *Email:* ${email}
    *Impact:* ${impact || 'N/A'}
    *Description:* ${bugDescription}
    ${signedScreenshotUrl ? `*Screenshot:* ${signedScreenshotUrl}` : ''}
    `;

    slack.chat.postMessage({
      channel: SLACK_CHANNEL,
      text: slackMessage
    }).catch(console.error);
    
    res.json({ success: true, message: 'Bug report submitted', reportId: reportKey });
    

  } catch (err) {
    console.error('Full submission error:', err); // Enhanced logging
    console.error('Error stack:', err.stack); // Add stack trace
    res.status(500).json({ message: 'Failed to submit bug report', error: err.message });
  }

  

});

app.get("/admin/reports", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: "reports/"
    });

    const { Contents } = await s3.send(command);

    const reports = Contents.map(obj => ({
      key: obj.Key,
      lastModified: obj.LastModified,
      size: obj.Size
    }));

    res.json({ reports });
  } catch (err) {
    console.error("Error listing reports:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});


app.get("/admin/report/:key", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { key } = req.params;

  try {
    // Step 1: Get the bug report JSON
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: decodeURIComponent(key),
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    const reportRes = await fetch(url);
    const reportJson = await reportRes.json();

    // Step 2: If screenshot is present, generate signed URL for that too
    if (reportJson.screenshotUrl) {
      const screenshotKey = reportJson.screenshotUrl.split(`.com/`)[1]; // Extract just the S3 key
      const screenshotCommand = new GetObjectCommand({
        Bucket: BUCKET,
        Key: screenshotKey,
      });

      const signedScreenshotUrl = await getSignedUrl(s3, screenshotCommand, { expiresIn: 60 });
      reportJson.screenshotUrl = signedScreenshotUrl;
    }

    // Send the modified report JSON directly
    res.json({ report: reportJson });
  } catch (err) {
    console.error("Error loading report or screenshot:", err);
    res.status(500).json({ message: "Could not load report" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

