import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const dogBanner = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80';

const Dashboard = ({ pets, activities, healthRecords }) => {
  const stats = [
    { label: 'Pets', value: pets.length, icon: <PetsIcon />, color: '#B6B09F' },
    { label: 'Activities', value: activities.length, icon: <FitnessCenterIcon />, color: '#EAE4D5' },
    { label: 'Health Records', value: healthRecords.length, icon: <LocalHospitalIcon />, color: '#F2F2F2' },
  ];

  // Combine and sort recent activities and health records by date (descending)
  const recent = [
    ...activities.map(a => ({
      type: 'activity',
      date: a.date,
      icon: <FitnessCenterIcon color="secondary" />,
      text: `${a.pet} - ${a.type}${a.duration ? ` (${a.duration})` : ''}${a.notes ? `: ${a.notes}` : ''}`
    })),
    ...healthRecords.map(r => ({
      type: 'health',
      date: r.date,
      icon: <LocalHospitalIcon sx={{ color: '#B6B09F' }} />,
      text: `${r.pet} - ${r.type}${r.notes ? `: ${r.notes}` : ''}`
    }))
  ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const recent5 = recent.slice(0, 5);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src={dogBanner} alt="Happy dog" style={{ width: '100%', maxWidth: 700, borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
      </Box>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Welcome to Lemmiklooma Tervise App!
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2, mb: 4 }}>
        {stats.map((stat) => (
          <Grid item key={stat.label} xs={12} sm={4}>
            <Card sx={{ borderRadius: 4, boxShadow: 3, textAlign: 'center', py: 3 }}>
              <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56, mx: 'auto', mb: 1 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
              <Typography variant="h6" color="text.secondary">{stat.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Paper elevation={2} sx={{ p: 3, maxWidth: 700, mx: 'auto', borderRadius: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Recent Activity</Typography>
        <List>
          {recent5.length === 0 && (
            <ListItem><ListItemText primary="No recent activity yet." /></ListItem>
          )}
          {recent5.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#EAE4D5', color: '#000' }}>{item.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.text} secondary={item.date} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard; 