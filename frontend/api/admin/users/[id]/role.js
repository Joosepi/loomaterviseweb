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
  if (req.method !== 'PATCH') {
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

  const userId = req.query.id; // Vercel dynamic route parameter
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const [userRows] = await db.execute('SELECT email FROM users WHERE id = ?', [userId]);
    const userToUpdate = userRows[0];

    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (userToUpdate.email === ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Cannot change main admin role' });
    }

    await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Update user role error:', error);
    return res.status(500).json({ error: 'Update failed' });
  }
} 