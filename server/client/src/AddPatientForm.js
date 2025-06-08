import React, { useState, useEffect } from 'react';

function AddPatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date_of_birth: ''
  });
  const [message, setMessage] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://localhost:5000/patients');
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const newPatient = await res.json();
        setMessage(`✅ Added: ${newPatient.name}`);
        setFormData({ name: '', email: '', date_of_birth: '' });
        fetchPatients(); // Refresh patient list
      } else {
        const error = await res.json();
        setMessage(`❌ Error: ${error.error || 'Failed to add patient'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network error');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Add Patient</button>
      </form>
      <p>{message}</p>

      <h3>All Patients</h3>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name} – {patient.email} – {patient.date_of_birth}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPatientForm;
