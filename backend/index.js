// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const JWT_SECRET = 'supersecretkey'; // In production, use env var
const ADMIN_EMAIL = 'admin@loomaterviseweb.com';
const ADMIN_PASS = 'admin123';

// Simple CORS configuration
app.use(cors());

app.use(express.json());

// MySQL setup
const db = mysql.createConnection({
  host: 'd118823.mysql.zonevs.eu',
  user: 'd118823sa456410',
  password: 'dababy123123',
  database: 'd118823_loomatervis'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to Zone.ee MySQL!');
});

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  const hash = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
    if (err) return res.status(400).json({ error: 'Email already in use' });
    res.json({ success: true });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    const user = results && results[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
});

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin middleware
function admin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

app.get('/', (req, res) => {
  res.send('API is running!');
});

// List all users (admin only)
app.get('/api/admin/users', auth, admin, (req, res) => {
  db.query('SELECT id, name, email, role, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// Delete user (admin only, cannot delete main admin)
app.delete('/api/admin/users/:id', auth, admin, (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    const user = results && results[0];
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    if (user.email === ADMIN_EMAIL) return res.status(403).json({ error: 'Cannot delete main admin' });
    db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      res.json({ success: true });
    });
  });
});

// Update user role (admin only, cannot change main admin)
app.patch('/api/admin/users/:id/role', auth, admin, (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    const user = results && results[0];
    if (err || !user) return res.status(404).json({ error: 'User not found' });
    if (user.email === ADMIN_EMAIL) return res.status(403).json({ error: 'Cannot change main admin role' });
    db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ success: true });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));