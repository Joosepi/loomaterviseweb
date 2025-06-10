import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Divider, Chip } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StarIcon from '@mui/icons-material/Star';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const heroDog = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=80';

const Dashboard = ({ pets, activities, healthRecords }) => {
  const navigate = useNavigate();

  // Calculate additional stats
  const upcomingEvents = healthRecords.filter(r => {
    const date = new Date(r.date);
    return date > new Date();
  }).length;
  const missedActivities = activities.filter(a => {
    const date = new Date(a.date);
    return date < new Date() && !a.completed;
  }).length;
  const avgActivity = pets.length > 0 ? (activities.length / pets.length).toFixed(1) : 0;

  const stats = [
    { label: 'Pets', value: pets.length, icon: <PetsIcon sx={{ fontSize: 36 }} />, color: '#15616d', bg: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)', to: '/pets' },
    { label: 'Activities', value: activities.length, icon: <FitnessCenterIcon sx={{ fontSize: 36 }} />, color: '#6ca965', bg: 'linear-gradient(135deg, #e0f7fa 0%, #a5d6a7 100%)', to: '/activities' },
    { label: 'Health Records', value: healthRecords.length, icon: <LocalHospitalIcon sx={{ fontSize: 36 }} />, color: '#ffb74d', bg: 'linear-gradient(135deg, #fffde4 0%, #ffb74d 100%)', to: '/healthrecords' },
    { label: 'Upcoming Events', value: upcomingEvents, icon: <EventAvailableIcon sx={{ fontSize: 36 }} />, color: '#1976d2', bg: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', to: '/healthrecords' },
    { label: 'Missed Activities', value: missedActivities, icon: <ErrorOutlineIcon sx={{ fontSize: 36 }} />, color: '#d32f2f', bg: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', to: '/activities' },
    { label: 'Avg Activity / Pet', value: avgActivity, icon: <BarChartIcon sx={{ fontSize: 36 }} />, color: '#512da8', bg: 'linear-gradient(135deg, #ede7f6 0%, #b39ddb 100%)', to: '/activities' },
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

  // Generate sample data for the activity trend chart
  const activityTrendData = [
    { name: 'Mon', activities: 4, health: 2 },
    { name: 'Tue', activities: 3, health: 1 },
    { name: 'Wed', activities: 5, health: 3 },
    { name: 'Thu', activities: 2, health: 2 },
    { name: 'Fri', activities: 6, health: 1 },
    { name: 'Sat', activities: 4, health: 2 },
    { name: 'Sun', activities: 3, health: 1 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, gap: 6, minHeight: '400px', width: '100%' }}>
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
              borderRadius: '50%',
              objectFit: 'cover',
              aspectRatio: '1 / 1',
              boxShadow: '0 12px 24px rgba(21,97,109,0.20)',
              border: '8px solid white',
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
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
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
            onClick={() => navigate(stat.to)}
            sx={{
              borderRadius: 6,
              boxShadow: '0 4px 24px 0 rgba(21,97,109,0.10)',
              textAlign: 'center',
              py: 5,
              px: 2,
              minWidth: 200,
              minHeight: 260,
              cursor: 'pointer',
              transition: 'transform 0.18s, box-shadow 0.18s, background 0.18s',
              background: stat.bg,
              color: stat.color,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: '0 8px 32px 0 rgba(21,97,109,0.18)',
                filter: 'brightness(1.08)',
              },
            }}
          >
            {/* Floating Icon */}
            <Avatar sx={{
              bgcolor: '#fff',
              color: stat.color,
              width: 72,
              height: 72,
              boxShadow: '0 4px 16px 0 rgba(21,97,109,0.10)',
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              border: `4px solid ${stat.bg.split(' ')[1] || '#fff'}`,
              zIndex: 2
            }}>
              {stat.icon}
            </Avatar>
            <Box sx={{ mt: 10 }} />
            <Typography variant="h2" sx={{ fontWeight: 800, color: stat.color, mb: 1, mt: 2, fontSize: { xs: '2.2rem', md: '2.8rem' } }}>{stat.value}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>{stat.label}</Typography>
          </Card>
        ))}
      </Box>

      {/* Activity Trends Chart */}
      <Card sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(21,97,109,0.10)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TrendingUpIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Weekly Activity Trends
          </Typography>
        </Box>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line type="monotone" dataKey="activities" stroke="#15616d" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="health" stroke="#6ca965" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

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
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>Recent Activity</Typography>
          </Box>
          <Chip label="Last 5 Activities" color="primary" variant="outlined" />
        </Box>
        <Divider />
        <List sx={{ px: 3, pb: 3 }}>
          {recent5.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No recent activity yet." 
                sx={{ color: 'text.secondary', textAlign: 'center' }} 
              />
            </ListItem>
          ) : (
            recent5.map((item, idx) => (
              <ListItem 
                key={idx} 
                sx={{ 
                  '&:not(:last-child)': { mb: 1 },
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                    bgcolor: 'rgba(21,97,109,0.04)',
                    borderRadius: 2
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#e0f7fa', color: '#15616d', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      {item.date}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard; 