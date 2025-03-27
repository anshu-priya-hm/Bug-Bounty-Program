import React from "react";
import styles from "../styles/BountyProgram.module.css";
import Link from "next/link";

const BountyProgram = () => {
  return (
    <div className={styles.bountyContainer}>
      <h1 className={styles.bountyTitle}>Bug Bounty Program</h1>

      <h2 className={styles.heading2}>Objective</h2>
      <p className={styles.paragraph}>
        Encourage community members, developers, security researchers, and contributors to actively participate in identifying 
        issues, bugs, vulnerabilities, or improvements in a product, platform, or service. The program rewards participants through 
        recognition, professional growth opportunities, and exclusive benefits. However, certain types of activities are strictly 
        prohibited to ensure a safe, ethical, and legal approach to testing and contribution.
      </p>

      <h2 className={styles.heading2}>Bounty Categories</h2>

      <h3 className={styles.heading3}>🔒 Security Research and Vulnerability Reporting</h3>
      <p className={styles.paragraph}><strong>Objective:</strong> Identify exploitable security flaws or vulnerabilities within the product/service.</p>
      <p className={styles.paragraph}><strong>Incentives:</strong></p>
      <div className={styles.bountyList}>
        🏆 <strong>Recognition on the Wall of Fame:</strong> Top contributors will be prominently featured on a public leaderboard.<br />
        📜 <strong>Exclusive Certification:</strong> A personalized certificate recognizing the participant’s contribution.<br />
        📖 <strong>Feature in Case Studies/Whitepapers:</strong> Get credited for their contributions in official company publications.
      </div>

      <h3 className={styles.heading3}>🐞 Bug Reporting and Testing</h3>
      <p className={styles.paragraph}><strong>Objective:</strong> Discover exploitable bugs, glitches, or errors in the product.</p>
      <p className={styles.paragraph}><strong>Incentives:</strong></p>
      <div className={styles.bountyList}>
        📝 <strong>Beta Tester Recognition:</strong> A public “thank you” mention on company blogs or newsletters.<br />
        📂 <strong>Contribution Profile:</strong> The ability to showcase contributions on LinkedIn.
      </div>

      <h3 className={styles.heading3}>💡 Feature Requests & Improvements</h3>
      <p className={styles.paragraph}><strong>Objective:</strong> Suggest and implement useful new features or improvements in the product.</p>
      <p className={styles.paragraph}><strong>Incentives:</strong></p>
      <div className={styles.bountyList}>
        📌 <strong>Public Acknowledgment in Release Notes:</strong> Your suggestions acknowledged in official release notes.<br />
        🚀 <strong>Career Advancement Opportunities:</strong> Recommendation letters or access to networking events.
      </div>

      <h2 className={styles.prohibitedTitle}>🚫 Prohibited Activities</h2>
      <p className={styles.paragraph}>To maintain a secure and legal testing environment, participants must adhere to the following guidelines:</p>

      <h3 className={styles.heading3}>❌ No Intrusive or Destructive Testing</h3>
      <div className={styles.bountyList}>
        🔹 No DDoS Attacks<br />
        🔹 No Data Deletion or Corruption<br />
        🔹 No Creating Unintended Disruptions
      </div>

      <h3 className={styles.heading3}>❌ No Social Engineering or Phishing</h3>
      <div className={styles.bountyList}>
        🔹 No Impersonating Employees or Users<br />
        🔹 No Unauthorized Access to User Data
      </div>

      <h3 className={styles.heading3}>❌ No Unauthorized Security Testing</h3>
      <div className={styles.bountyList}>
        🔹 Penetration Testing Must Be Pre-Approved<br />
        🔹 No Unauthorized Scanning
      </div>

      <h3 className={styles.heading3}>❌ No Exploiting Vulnerabilities</h3>
      <div className={styles.bountyList}>
        🔹 Responsible Disclosure Required<br />
        🔹 No Unauthorized Access to Servers
      </div>

      <h2 className={styles.heading2}>🌟 Global Leaderboard & Recognition</h2>
      <p className={styles.paragraph}>Top contributors will be displayed on a public leaderboard. Each quarter, the top 3 contributors receive VIP titles like:</p>
      <div className={styles.bountyList}>
        🏅 Security Legend<br />
        🚀 Innovation Master
      </div>
      <div align="center">
        <Link href="/submit-report">
          <button className={styles.submitReportButton}>SUBMIT A BUG REPORT</button>
        </Link>
      </div>
    </div>
  );
};

export default BountyProgram;
