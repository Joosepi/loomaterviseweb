import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StarIcon from '@mui/icons-material/Star';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const heroDog = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80';

const Dashboard = ({ pets, activities, healthRecords }) => {
  const stats = [
    { label: 'Pets', value: pets.length, icon: <PetsIcon sx={{ fontSize: 36 }} />, color: '#15616d' },
    { label: 'Activities', value: activities.length, icon: <FitnessCenterIcon sx={{ fontSize: 36 }} />, color: '#6ca965' },
    { label: 'Health Records', value: healthRecords.length, icon: <LocalHospitalIcon sx={{ fontSize: 36 }} />, color: '#ffb74d' },
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
      icon: <LocalHospitalIcon sx={{ color: '#15616d' }} />,
      text: `${r.pet} - ${r.type}${r.notes ? `: ${r.notes}` : ''}`
    }))
  ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const recent5 = recent.slice(0, 5);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, px: 2, gap: 6, background: 'linear-gradient(90deg, #f9f9f9 60%, #eaf6f6 100%)' }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            Your Pet's Health, Simplified
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4 }}>
            Track your pets, activities, and health records in one beautiful place. Designed for loving owners and modern kennels.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5, fontWeight: 700, fontSize: 18, borderRadius: 3 }} href="/pets">
            Get Started
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={heroDog} alt="Happy dog" style={{ width: '100%', maxWidth: 420, borderRadius: 24, boxShadow: '0 8px 32px rgba(21,97,109,0.10)' }} />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, mb: 4 }}>
        {stats.map((stat) => (
          <Grid item key={stat.label} xs={12} sm={4} md={3}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: 4,
                textAlign: 'center',
                py: 4,
                px: 2,
                minWidth: 200,
                maxWidth: 260,
                mx: 'auto',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.04)',
                  boxShadow: 8,
                },
              }}
            >
              <Avatar sx={{ bgcolor: stat.color, width: 64, height: 64, mx: 'auto', mb: 2, boxShadow: 2 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
              <Typography variant="h6" color="text.secondary">{stat.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Why Choose Us Section */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 8, mb: 6, px: 2 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          Why Choose Lemmiklooma Tervise App?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <StarIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Trusted by Pet Owners</Typography>
              <Typography color="text.secondary">Our platform is used by hundreds of loving pet owners and kennels.</Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <VolunteerActivismIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Easy & Secure</Typography>
              <Typography color="text.secondary">Your pet data is safe, secure, and always accessible from any device.</Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <EmojiEmotionsIcon sx={{ fontSize: 48, color: '#ffb74d', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Designed for You</Typography>
              <Typography color="text.secondary">A beautiful, intuitive interface that makes pet care a joy.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Activity Section */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, maxWidth: 700, mx: 'auto', background: '#f7f6f3', mb: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Recent Activity</Typography>
        <List>
          {recent5.length === 0 && (
            <ListItem><ListItemText primary="No recent activity yet." /></ListItem>
          )}
          {recent5.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#eaf6f6', color: '#15616d' }}>{item.icon}</Avatar>
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