const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /patients — fetch all patients
router.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM patients ORDER BY id DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch patients' });
    }
  });

router.post('/', async (req, res) => {
    const { name, email, date_of_birth } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
  
    try {
      const result = await db.query(
        'INSERT INTO patients (name, email, date_of_birth) VALUES ($1, $2, $3) RETURNING *',
        [name, email, date_of_birth]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
