import React from "react";
import "../styles/BountyProgram.css";
import Link from "next/link";

const BountyProgram = () => {
  return (
    <div className="bounty-container">
      <h1 className="bounty-title">Bug Bounty Program</h1>

      <h2>Objective</h2>
      <p>
        Encourage community members, developers, security researchers, and contributors to actively participate in identifying 
        issues, bugs, vulnerabilities, or improvements in a product, platform, or service. The program rewards participants through 
        recognition, professional growth opportunities, and exclusive benefits. However, certain types of activities are strictly 
        prohibited to ensure a safe, ethical, and legal approach to testing and contribution.
      </p>

      <h2>Bounty Categories</h2>

      <h3>🔒 Security Research and Vulnerability Reporting</h3>
      <p><strong>Objective:</strong> Identify exploitable security flaws or vulnerabilities within the product/service.</p>
      <p><strong>Incentives:</strong></p>
      <div className="bounty-list">
        🏆 <strong>Recognition on the Wall of Fame:</strong> Top contributors will be prominently featured on a public leaderboard.<br />
        📜 <strong>Exclusive Certification:</strong> A personalized certificate recognizing the participant’s contribution.<br />
        📖 <strong>Feature in Case Studies/Whitepapers:</strong> Get credited for their contributions in official company publications.
      </div>

      <h3>🐞 Bug Reporting and Testing</h3>
      <p><strong>Objective:</strong> Discover exploitable bugs, glitches, or errors in the product.</p>
      <p><strong>Incentives:</strong></p>
      <div className="bounty-list">
        📝 <strong>Beta Tester Recognition:</strong> A public “thank you” mention on company blogs or newsletters.<br />
        📂 <strong>Contribution Profile:</strong> The ability to showcase contributions on LinkedIn.
      </div>

      <h3>💡 Feature Requests & Improvements</h3>
      <p><strong>Objective:</strong> Suggest and implement useful new features or improvements in the product.</p>
      <p><strong>Incentives:</strong></p>
      <div className="bounty-list">
        📌 <strong>Public Acknowledgment in Release Notes:</strong> Your suggestions acknowledged in official release notes.<br />
        🚀 <strong>Career Advancement Opportunities:</strong> Recommendation letters or access to networking events.
      </div>

      <h2 className="prohibited-title">🚫 Prohibited Activities</h2>
      <p>To maintain a secure and legal testing environment, participants must adhere to the following guidelines:</p>

      <h3>❌ No Intrusive or Destructive Testing</h3>
      <div className="bounty-list">
        🔹 No DDoS Attacks<br />
        🔹 No Data Deletion or Corruption<br />
        🔹 No Creating Unintended Disruptions
      </div>

      <h3>❌ No Social Engineering or Phishing</h3>
      <div className="bounty-list">
        🔹 No Impersonating Employees or Users<br />
        🔹 No Unauthorized Access to User Data
      </div>

      <h3>❌ No Unauthorized Security Testing</h3>
      <div className="bounty-list">
        🔹 Penetration Testing Must Be Pre-Approved<br />
        🔹 No Unauthorized Scanning
      </div>

      <h3>❌ No Exploiting Vulnerabilities</h3>
      <div className="bounty-list">
        🔹 Responsible Disclosure Required<br />
        🔹 No Unauthorized Access to Servers
      </div>

      <h2>🌟 Global Leaderboard & Recognition</h2>
      <p>Top contributors will be displayed on a public leaderboard. Each quarter, the top 3 contributors receive VIP titles like:</p>
      <div className="bounty-list">
        🏅 Security Legend<br />
        🚀 Innovation Master
      </div>
      <div align="center">
      <Link href="/submit-report">
        <button className="submitReport-button">SUBMIT A BUG REPORT</button>
      </Link></div>
    </div>
  );
};

export default BountyProgram;


