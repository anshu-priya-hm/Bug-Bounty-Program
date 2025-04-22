//this code gives metadata of reportand the url for image uploaded , although we cannot see the image bcz of permission issue
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000'; // your backend

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const adminSecret = 's3cr3tAdm1nT0ken2025!'; // replace or move to env

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/reports`, {
          headers: {
            Authorization: `Bearer ${adminSecret}`,
          },
        });
    
        const data = await res.json();
        setReports(data.reports || []); // <-- fix here
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReports([]); // fallback to empty array to avoid crash
      }
    };
    

    fetchReports();
  }, []);


  const loadReport = async (key) => {
    try {
      const res = await fetch(`${API_BASE}/admin/report/${encodeURIComponent(key)}`, {
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      });
  
      const data = await res.json();
      setSelectedReport({ key, content: data.report });
    } catch (err) {
      console.error('Failed to load report:', err);
    }
  };
  

  return (
    <div>
      <h2>All Bug Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.key}>
            <button onClick={() => loadReport(report.key)}>
              {report.key} — {new Date(report.lastModified).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>

      {selectedReport && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h3>Report: {selectedReport.key}</h3>
          <pre>{JSON.stringify(selectedReport.content, null, 2)}</pre>

          {selectedReport.content.screenshot && (
            <div>
              <h4>Screenshot</h4>
              <img
                src={selectedReport.content.screenshot}
                alt="Screenshot"
                style={{ maxWidth: '100%', border: '1px solid #ccc' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewReports;

