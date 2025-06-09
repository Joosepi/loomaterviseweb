import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const dogImg = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80';

const Register = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      showNotification('Registration successful! Please login.', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ maxWidth: 370, width: '100%', p: 3, boxShadow: 6, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar src={dogImg} alt="Dog" sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Create your account to manage your pets' health.
          </Typography>
        </Box>
        <CardContent sx={{ p: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoComplete="name"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
            />
            <TextField
              label="Confirm Password"
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, py: 1.2, fontWeight: 600, fontSize: 16 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register; 