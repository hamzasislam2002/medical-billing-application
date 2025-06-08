import React from 'react';
import AddPatientForm from './AddPatientForm';
import ViewPatients from './ViewPatients';

function App() {
  return (
    <div>
      <h1>Medical Billing App</h1>
      <AddPatientForm />
      <ViewPatients />
    </div>
  );
}

export default App;