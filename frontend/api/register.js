const mysql = require('mysql2/promise'); // Using promise-based API
const bcrypt = require('bcryptjs');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default async function handler(req, res) {
  console.log('Register API hit!');
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    console.log('Attempting to hash password and insert user...');
    const hash = bcrypt.hashSync(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, 'user']
    );
    
    // Seed admin if not exists (only if this is the first user or similar logic)
    // This part should ideally be a separate setup script or handled carefully in a serverless environment
    // For now, removing the direct admin seed here to avoid multiple entries

    return res.status(200).json({ success: true, userId: result.insertId });
  } catch (error) {
    console.error('Registration error details:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    return res.status(500).json({ error: 'An unexpected server error occurred during registration.' });
  }
} 