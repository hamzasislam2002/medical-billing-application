import React, { useState } from 'react';

function AddPatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date_of_birth: ''
  });

  const [message, setMessage] = useState('');

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
    <div style={{ maxWidth: 400, margin: 'auto' }}>
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
    </div>
  );
}

export default AddPatientForm;
