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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, gap: 6, background: 'linear-gradient(90deg, #e0f2f7 60%, #c8e6c9 100%)', minHeight: '400px', width: '100%' }}>
        <Box sx={{ flex: 1, minWidth: 300, textAlign: { xs: 'center', md: 'left' } }}>
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
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={heroDog}
            alt="Happy dog"
            sx={{
              width: '100%',
              maxWidth: 420,
              borderRadius: '50%', /* Make it circular */
              objectFit: 'cover',
              aspectRatio: '1 / 1', /* Maintain aspect ratio for circular shape */
              boxShadow: '0 12px 24px rgba(21,97,109,0.20)', /* Enhanced shadow */
              border: '8px solid white', /* White border for emphasis */
            }}
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr', /* Full width on extra small screens */
            sm: 'repeat(2, 1fr)', /* Two columns on small screens */
            md: 'repeat(3, 1fr)', /* Three columns on medium screens */
          },
          justifyContent: 'center',
          mt: { xs: 2, md: 6 },
          mb: 4,
          width: '100%'
        }}
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              borderRadius: 5,
              boxShadow: '0 8px 32px 0 rgba(21,97,109,0.10)',
              textAlign: 'center',
              py: 4,
              px: 2,
              minWidth: 200,
              transition: 'transform 0.18s, box-shadow 0.18s',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.04)',
                boxShadow: 8,
              },
            }}
          >
            <Box sx={{
              height: 6,
              width: '100%',
              borderRadius: '5px 5px 0 0',
              background: 'linear-gradient(90deg, #15616d 0%, #6ca965 100%)',
              mb: 2
            }} />
            <Avatar sx={{ bgcolor: stat.color, width: 64, height: 64, mx: 'auto', mb: 2, boxShadow: 2 }}>
              {stat.icon}
            </Avatar>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
          </Card>
        ))}
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ mt: 8, mb: 6, width: '100%' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 4, color: 'primary.main', fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.2 }}>
          Why Choose Lemmiklooma Tervise App?
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
            justifyContent: 'center',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <StarIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}>Trusted by Pet Owners</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>Our platform is used by hundreds of loving pet owners and kennels.</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <VolunteerActivismIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}>Easy & Secure</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>Your pet data is safe, secure, and always accessible from any device.</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <EmojiEmotionsIcon sx={{ fontSize: 60, color: '#ffb74d', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.dark' }}>Designed for You</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>A beautiful, intuitive interface that makes pet care a joy.</Typography>
          </Box>
        </Box>
      </Box>

      {/* Recent Activity Section */}
      <Paper elevation={1} sx={{ borderRadius: 4, background: '#ffffff', mb: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary', px: 3, pt: 3 }}>Recent Activity</Typography>
        <List sx={{ px: 3, pb: 3 }}>
          {recent5.length === 0 && (
            <ListItem><ListItemText primary="No recent activity yet." sx={{ color: 'text.secondary' }} /></ListItem>
          )}
          {recent5.map((item, idx) => (
            <ListItem key={idx} sx={{ '&:not(:last-child)': { mb: 1 } }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#e0f7fa', color: '#15616d', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{item.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={<Typography variant="body1" sx={{ fontWeight: 500 }}>{item.text}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>{item.date}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard; 