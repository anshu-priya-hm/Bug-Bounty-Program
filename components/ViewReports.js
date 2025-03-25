import { useState, useEffect } from "react";

const ViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  return (
    <div>
      <h1>Submitted Bug Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <strong>{report.name}</strong> ({report.email})  
              <p><strong>Description:</strong> {report.bug_description}</p>
              <p><strong>Impact:</strong> {report.impact}</p>
              {report.file_path && (
                <p>
                  <a href={`http://localhost:5000/${report.file_path}`} target="_blank" rel="noopener noreferrer">
                    View Screenshot
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewReports;
