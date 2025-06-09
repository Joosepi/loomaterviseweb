const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@loomaterviseweb.com';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Auth middleware equivalent
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // Attach user to request for admin check
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Admin middleware equivalent
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }

  try {
    const [rows] = await db.execute('SELECT id, name, email, role, created_at FROM users');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({ error: 'DB error' });
  }
} 