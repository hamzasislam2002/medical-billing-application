import React, { useEffect, useState } from 'react';

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => {
        console.error(err);
        setError('❌ Failed to fetch patients');
      });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: '2rem' }}>
      <h2>Patient List</h2>
      {error && <p>{error}</p>}
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        patients.map((patient, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '1rem 0',
            }}
          >
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
            <p><strong>ID:</strong> {patient.id}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewPatients;
