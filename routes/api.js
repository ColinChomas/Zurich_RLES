const express = require('express');
const { Pool } = require('pg');

const router = express.Router('/api');

// TODO: Add auth (API key or session) when requirements are defined.

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

const sendError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// health check
router.get('/health', async (req, res) => {
  try {
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    sendError(res, error);
  }
});

// apiary
router.get('/apiaries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM apiary ORDER BY apiaryID');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/apiaries/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM apiary WHERE apiaryID = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Apiary not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/apiaries', async (req, res) => {
  const { name, zipcode } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO apiary (name, zipcode) VALUES ($1, $2) RETURNING *',
      [name, zipcode || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY userID');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE userID = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/users', async (req, res) => {
  const { username, password, userRole, preferences, apiaryID } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, userRole, preferences, apiaryID) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, password, userRole || null, preferences || null, apiaryID || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// credentials
router.get('/credentials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM credentials ORDER BY createdAt');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/credentials/:hashedKey', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM credentials WHERE hashedKey = $1', [req.params.hashedKey]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Credential not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/credentials', async (req, res) => {
  const { hashedKey, apiaryID } = req.body;
  if (!hashedKey) {
    return res.status(400).json({ error: 'hashedKey is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO credentials (hashedKey, apiaryID) VALUES ($1, $2) RETURNING *',
      [hashedKey, apiaryID || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// hive
router.get('/hives', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hive ORDER BY hiveID');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/hives/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hive WHERE hiveID = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hive not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/hives', async (req, res) => {
  const { hiveName, apiaryID } = req.body;
  if (!hiveName) {
    return res.status(400).json({ error: 'hiveName is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO hive (hiveName, apiaryID) VALUES ($1, $2) RETURNING *',
      [hiveName, apiaryID || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// alerts
router.get('/alerts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alerts ORDER BY alertID');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/alerts/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alerts WHERE alertID = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/alerts', async (req, res) => {
  const { name, description, hiveID, type } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO alerts (name, description, hiveID, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description || null, hiveID || null, type || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// hiveAnalytics
router.get('/hive-analytics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hiveAnalytics ORDER BY analyticID');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/hive-analytics/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hiveAnalytics WHERE analyticID = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hive analytics not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/hive-analytics', async (req, res) => {
  const { hiveID, temperature, weight, pressure, humidity, beeDeparture, generatedAt } = req.body;
  if (!hiveID) {
    return res.status(400).json({ error: 'hiveID is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO hiveAnalytics (hiveID, temperature, weight, pressure, humidity, beeDeparture, generatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [hiveID, temperature || null, weight || null, pressure || null, humidity || null, beeDeparture || null, generatedAt || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

// outsideAnalytics
router.get('/outside-analytics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM outsideAnalytics ORDER BY createdAt');
    res.json(result.rows);
  } catch (error) {
    sendError(res, error);
  }
});

router.post('/outside-analytics', async (req, res) => {
  const { apiaryID, temperature, createdAt } = req.body;
  if (!apiaryID) {
    return res.status(400).json({ error: 'apiaryID is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO outsideAnalytics (apiaryID, temperature, createdAt) VALUES ($1, $2, COALESCE($3, CURRENT_TIMESTAMP)) RETURNING *',
      [apiaryID, temperature || null, createdAt || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    sendError(res, error);
  }
});

module.exports = router;
