import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Activities from './pages/Activities';
import HealthRecords from './pages/HealthRecords';
import Login from './pages/Login';
import Register from './pages/Register';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Pets', icon: <PetsIcon />, path: '/pets' },
  { text: 'Activities', icon: <FitnessCenterIcon />, path: '/activities' },
  { text: 'Health Records', icon: <LocalHospitalIcon />, path: '/health' },
];

const initialPets = [
  { name: 'Bella', breed: 'Labrador Retriever', image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80' },
  { name: 'Max', breed: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80' },
  { name: 'Luna', breed: 'Beagle', image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80' },
];
const initialActivities = [
  { pet: 'Bella', type: 'Walk', date: '2024-05-20', duration: '30 min', notes: 'Morning walk in the park.' },
  { pet: 'Max', type: 'Training', date: '2024-05-19', duration: '20 min', notes: 'Obedience training.' },
  { pet: 'Luna', type: 'Play', date: '2024-05-18', duration: '15 min', notes: 'Fetch in the backyard.' },
];
const initialRecords = [
  { pet: 'Bella', type: 'Vaccination', date: '2024-05-10', notes: 'Rabies shot.' },
  { pet: 'Max', type: 'Vet Visit', date: '2024-04-28', notes: 'Annual checkup.' },
  { pet: 'Luna', type: 'Medication', date: '2024-05-01', notes: 'Flea prevention.' },
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // App-level state for all data
  const [pets, setPets] = useState(initialPets);
  const [activities, setActivities] = useState(initialActivities);
  const [healthRecords, setHealthRecords] = useState(initialRecords);

  // Handlers to add new items
  const addPet = (pet) => setPets((prev) => [...prev, pet]);
  const addActivity = (activity) => setActivities((prev) => [...prev, activity]);
  const addHealthRecord = (record) => setHealthRecords((prev) => [...prev, record]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main', color: 'text.primary', boxShadow: 3 }}>
        <Toolbar>
          <PetsIcon sx={{ fontSize: 32, mr: 2, color: '#000' }} />
          <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 1, flexGrow: 1 }}>
            Lemmiklooma Tervise App
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 600, mr: 1 }}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/register')} sx={{ fontWeight: 600 }}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'secondary.main',
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            pt: 2,
            background: 'linear-gradient(180deg, #EAE4D5 0%, #B6B09F 100%)',
            boxShadow: '2px 0 16px 0 rgba(182,176,159,0.15)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  mx: 1,
                  px: 2,
                  py: 1.5,
                  backgroundColor: location.pathname === item.path ? 'primary.main' : 'inherit',
                  color: location.pathname === item.path ? 'text.primary' : 'text.secondary',
                  boxShadow: location.pathname === item.path ? '0 2px 8px 0 rgba(182,176,159,0.10)' : 'none',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  fontSize: 18,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                    boxShadow: '0 2px 8px 0 rgba(182,176,159,0.10)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit', fontSize: 32 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 400, fontSize: 18 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard pets={pets} activities={activities} healthRecords={healthRecords} />} />
          <Route path="/pets" element={<Pets pets={pets} addPet={addPet} />} />
          <Route path="/activities" element={<Activities pets={pets} activities={activities} addActivity={addActivity} />} />
          <Route path="/health" element={<HealthRecords pets={pets} healthRecords={healthRecords} addHealthRecord={addHealthRecord} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
