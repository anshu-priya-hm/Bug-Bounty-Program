import { useState } from 'react';
import "../styles/SubmitReport.css";

const SubmitReport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bugDescription: '',
    impact: ''
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

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

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('bug_description', formData.bugDescription);
    formDataToSend.append('impact', formData.impact);
    if (file) formDataToSend.append('file', file);

    const response = await fetch('http://localhost:5000/api/submit-report', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setFormData({ name: '', email: '', bugDescription: '', impact: '' });
      setFile(null);
      document.querySelector('input[type="file"]').value = "";
    }
  };

  return (
    <div className="submit-container">
      <div className="submit-header">
        <h1>Submit a Bug Report</h1>
        <p>Help us improve Happy Money by reporting bugs or security vulnerabilities you find.</p>
      </div>

      <div className="form-container">
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
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />

          <button type="submit">Submit Report</button>
        </form>

        {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}

        <div className="back-button">
          <button onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;

