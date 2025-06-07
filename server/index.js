const express = require('express');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
app.use(express.json());

// Routes
const patientsRoutes = require('./routes/patients');
app.use('/patients', patientsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Medical Billing API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});