import React, { useState, useEffect } from 'react';
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
import AdminPanel from './pages/AdminPanel';
import { alpha } from '@mui/material/styles';

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
  
  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Listen for login/logout changes
  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('user');
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Load data from localStorage or use initial data
  const [pets, setPets] = useState(() => {
    const savedPets = localStorage.getItem('pets');
    return savedPets ? JSON.parse(savedPets) : initialPets;
  });
  
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : initialActivities;
  });
  
  const [healthRecords, setHealthRecords] = useState(() => {
    const savedRecords = localStorage.getItem('healthRecords');
    return savedRecords ? JSON.parse(savedRecords) : initialRecords;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('healthRecords', JSON.stringify(healthRecords));
  }, [healthRecords]);

  // Enhanced handlers with validation
  const addPet = (pet) => {
    if (!pet.name || !pet.breed) return;
    setPets((prev) => [...prev, { ...pet, id: Date.now() }]);
  };

  const addActivity = (activity) => {
    if (!activity.pet || !activity.type || !activity.date) return;
    setActivities((prev) => [...prev, { ...activity, id: Date.now() }]);
  };

  const addHealthRecord = (record) => {
    if (!record.pet || !record.type || !record.date) return;
    setHealthRecords((prev) => [...prev, { ...record, id: Date.now() }]);
  };

  // Add delete handlers
  const deletePet = (id) => {
    setPets((prev) => prev.filter(pet => pet.id !== id));
    // Also delete related activities and health records
    setActivities((prev) => prev.filter(activity => activity.petId !== id));
    setHealthRecords((prev) => prev.filter(record => record.petId !== id));
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter(activity => activity.id !== id));
  };

  const deleteHealthRecord = (id) => {
    setHealthRecords((prev) => prev.filter(record => record.id !== id));
  };

  // Add edit handlers
  const editPet = (id, updatedPet) => {
    setPets((prev) => prev.map(pet => pet.id === id ? { ...pet, ...updatedPet } : pet));
  };

  const editActivity = (id, updatedActivity) => {
    setActivities((prev) => prev.map(activity => activity.id === id ? { ...activity, ...updatedActivity } : activity));
  };

  const editHealthRecord = (id, updatedRecord) => {
    setHealthRecords((prev) => prev.map(record => record.id === id ? { ...record, ...updatedRecord } : record));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Helper: is admin
  const isAdmin = user && user.email === 'admin@loomaterviseweb.com';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main', color: '#fff', boxShadow: 6, borderBottom: '2px solid #15616d' }}>
        <Toolbar>
          <PetsIcon sx={{ fontSize: 32, mr: 2, color: '#fff' }} />
          <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 1, flexGrow: 1, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            Lemmiklooma Tervise App
          </Typography>
          {user ? (
            <>
              <Typography sx={{ fontWeight: 600, mr: 2, color: '#fff' }}>
                {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 600, color: '#fff' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 600, mr: 1, color: '#fff' }}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')} sx={{ fontWeight: 600, color: '#fff' }}>
                Register
              </Button>
            </>
          )}
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
            bgcolor: '#fff',
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            pt: 3,
            boxShadow: '4px 0 24px 0 rgba(21,97,109,0.10)',
            px: 2,
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  mb: 1.5,
                  borderRadius: 3,
                  mx: 0.5,
                  px: 2.5,
                  py: 2,
                  backgroundColor: location.pathname === item.path ? alpha('#15616d', 0.08) : 'inherit',
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  boxShadow: location.pathname === item.path ? '0 2px 12px 0 rgba(21,97,109,0.10)' : 'none',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  fontSize: 18,
                  borderLeft: location.pathname === item.path ? '6px solid #15616d' : '6px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: alpha('#15616d', 0.06),
                    color: 'primary.main',
                    transform: 'scale(1.04)',
                    boxShadow: '0 2px 12px 0 rgba(21,97,109,0.10)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit', fontSize: 32 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 400, fontSize: 18 }} />
              </ListItem>
            ))}
            {isAdmin && (
              <ListItem
                button
                key="AdminPanel"
                component={Link}
                to="/admin"
                sx={{
                  mb: 1.5,
                  borderRadius: 3,
                  mx: 0.5,
                  px: 2.5,
                  py: 2,
                  backgroundColor: location.pathname === '/admin' ? alpha('#15616d', 0.08) : 'inherit',
                  color: location.pathname === '/admin' ? 'primary.main' : 'text.secondary',
                  boxShadow: location.pathname === '/admin' ? '0 2px 12px 0 rgba(21,97,109,0.10)' : 'none',
                  fontWeight: location.pathname === '/admin' ? 700 : 400,
                  fontSize: 18,
                  borderLeft: location.pathname === '/admin' ? '6px solid #15616d' : '6px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: alpha('#15616d', 0.06),
                    color: 'primary.main',
                    transform: 'scale(1.04)',
                    boxShadow: '0 2px 12px 0 rgba(21,97,109,0.10)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit', fontSize: 32 }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" primaryTypographyProps={{ fontWeight: location.pathname === '/admin' ? 700 : 400, fontSize: 18 }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard pets={pets} activities={activities} healthRecords={healthRecords} />} />
          <Route path="/pets" element={
            <Pets 
              pets={pets} 
              addPet={addPet} 
              deletePet={deletePet}
              editPet={editPet}
            />
          } />
          <Route path="/activities" element={
            <Activities 
              pets={pets} 
              activities={activities} 
              addActivity={addActivity}
              deleteActivity={deleteActivity}
              editActivity={editActivity}
            />
          } />
          <Route path="/health" element={
            <HealthRecords 
              pets={pets} 
              healthRecords={healthRecords} 
              addHealthRecord={addHealthRecord}
              deleteHealthRecord={deleteHealthRecord}
              editHealthRecord={editHealthRecord}
            />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
