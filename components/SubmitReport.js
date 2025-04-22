import { useState } from 'react';
import styles from "../styles/SubmitReport.module.css";

const SubmitReport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bugDescription: '',
    impact: ''
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting report...');
    setIsSuccess(false);
  
    try {
      let screenshotKey = null;
  
      if (file) {
        console.log('Preparing to upload file:', file.name);
  
        //  Request presigned URL
        const presignRes = await fetch('http://localhost:5000/get-upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, fileType: file.type })
        });
  
        if (!presignRes.ok) {
          const errorData = await presignRes.json();
          throw new Error(`Presign URL failed: ${errorData.message}`);
        }
  
        const { uploadURL, key } = await presignRes.json();
        screenshotKey = key;
        console.log('Got presigned URL:', uploadURL);
  
        //  Upload directly to S3 using only Content-Type header
        const uploadRes = await fetch(uploadURL, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type 
          },
          body: file
        });
  
        if (!uploadRes.ok) {
          throw new Error(`File upload failed: ${uploadRes.status}`);
        }
  
        console.log('File uploaded successfully');
      }
  
      //  Submit bug report with file key
      const reportRes = await fetch('http://localhost:5000/submitreport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          bugDescription: formData.bugDescription,
          impact: formData.impact,
          screenshotKey
        })
      });
  
      if (!reportRes.ok) {
        const errorData = await reportRes.json();
        throw new Error(errorData.message || 'Report submission failed');
      }
  
      const data = await reportRes.json();
      setMessage('Report submitted successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', bugDescription: '', impact: '' });
      setFile(null);
      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error('Full submission error:', error);
      setMessage(`Error: ${error.message}`);
    }
  };  
  


  return (
    <div className={styles.page}>
    <div className={styles.submitContainer}>
      <div className={styles.submitHeader}>
        <h1>Submit a Bug Report</h1>
        <p>Help us improve Happy Money by reporting bugs or security vulnerabilities you find.</p>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Your Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Bug Description</label>
          <textarea name="bugDescription" value={formData.bugDescription} onChange={handleChange} required rows="4" />

          <label>How does this bug affect Happy Money?</label>
          <textarea name="impact" value={formData.impact} onChange={handleChange} required rows="3" />

          <label>Attach Screenshot or File</label>
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange}  required />

          <button type="submit">Submit Report</button>
        </form>

        {message && <p className={styles.successMessage}>{message}</p>}

        <div className={styles.backButton}>
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubmitReport;
