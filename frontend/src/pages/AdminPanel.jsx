import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Stack, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const ADMIN_EMAIL = 'admin@loomaterviseweb.com';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, admins: 0, users: 0 });
  const [recent, setRecent] = useState([]);
  const [signupData, setSignupData] = useState([]);

  const fetchUsers = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setStats({
          total: data.length,
          admins: data.filter(u => u.role === 'admin').length,
          users: data.filter(u => u.role === 'user').length,
        });
        setRecent([...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5));
        // Registration trends by date (YYYY-MM-DD)
        const trends = {};
        data.forEach(u => {
          const d = u.created_at ? u.created_at.slice(0, 10) : 'Unknown';
          trends[d] = (trends[d] || 0) + 1;
        });
        setSignupData(Object.entries(trends).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id, email) => {
    if (email === ADMIN_EMAIL) return;
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(() => fetchUsers());
  };

  const handleToggleRole = (id, currentRole, email) => {
    if (email === ADMIN_EMAIL) return;
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then(res => res.json())
      .then(() => fetchUsers());
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
        Admin Panel
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Welcome, admin! Here are your platform statistics and user management tools.
      </Typography>
      <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}><GroupIcon /></Avatar>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{stats.total}</Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}><AdminPanelSettingsIcon /></Avatar>
          <Typography variant="h6">Admins</Typography>
          <Typography variant="h4">{stats.admins}</Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#15616d', mb: 1 }}><PersonIcon /></Avatar>
          <Typography variant="h6">Regular Users</Typography>
          <Typography variant="h4">{stats.users}</Typography>
        </Card>
      </Stack>
      <Card sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon color="primary" /> Registration Trends
        </Typography>
        <Box sx={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={signupData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <RechartsTooltip />
              <Bar dataKey="count" fill="#15616d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Registrations
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Registered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recent.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.created_at ? new Date(user.created_at).toLocaleString() : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            All Users
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.created_at ? new Date(user.created_at).toLocaleString() : ''}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {user.email !== ADMIN_EMAIL && (
                            <Tooltip title="Delete User">
                              <IconButton color="error" onClick={() => handleDelete(user.id, user.email)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {user.email !== ADMIN_EMAIL && (
                            <Tooltip title="Toggle Role">
                              <IconButton color="primary" onClick={() => handleToggleRole(user.id, user.role, user.email)}>
                                <SwapHorizIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminPanel; 