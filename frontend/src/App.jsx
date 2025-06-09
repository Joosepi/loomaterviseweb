import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAlert from '@mui/material/Alert';
import SvgIcon from '@mui/material/SvgIcon';

import Dashboard from './pages/Dashboard';
import Pets from './pages/Pets';
import Activities from './pages/Activities';
import HealthRecords from './pages/HealthRecords';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import { NotificationProvider } from './context/NotificationContext';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Pets', icon: <PetsIcon />, path: '/pets' },
  { text: 'Activities', icon: <FitnessCenterIcon />, path: '/activities' },
  { text: 'Health Records', icon: <LocalHospitalIcon />, path: '/healthrecords' },
];

const initialPets = [
  { id: 1, name: 'Bella', breed: 'Labrador Retriever', image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Max', breed: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Luna', breed: 'Beagle', image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80' },
];
const initialActivities = [
  { id: 1, pet: 'Bella', type: 'Walk', date: '2024-05-20', duration: '30 min', notes: 'Morning walk in the park.', petId: 1 },
  { id: 2, pet: 'Max', type: 'Training', date: '2024-05-19', duration: '20 min', notes: 'Obedience training.', petId: 2 },
  { id: 3, pet: 'Luna', type: 'Play', date: '2024-05-18', duration: '15 min', notes: 'Fetch in the backyard.', petId: 3 },
];
const initialRecords = [
  { id: 1, pet: 'Bella', type: 'Vaccination', date: '2024-05-10', notes: 'Rabies shot.', petId: 1 },
  { id: 2, pet: 'Max', type: 'Vet Visit', date: '2024-04-28', notes: 'Annual checkup.', petId: 2 },
  { id: 3, pet: 'Luna', type: 'Medication', date: '2024-05-01', notes: 'Flea prevention.', petId: 3 },
];

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#15616d',
    },
    secondary: {
      main: '#6ca965',
    },
    background: {
      default: '#f0f8ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 700 },
    h2: { fontSize: '3rem', fontWeight: 800 },
    h3: { fontSize: '2.2rem', fontWeight: 600 },
    h4: { fontSize: '1.8rem', fontWeight: 600 },
    h5: { fontSize: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '1.2rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&.Mui-focused fieldset': {
              borderColor: '#15616d',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#6ca965',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4a5568',
            '&.Mui-focused': {
              color: '#15616d',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
          py: 0.5,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          bgcolor: '#ffffff',
          borderTopRightRadius: 32,
          borderBottomRightRadius: 32,
          pt: 3,
          boxShadow: '4px 0 24px 0 rgba(21,97,109,0.10)',
          px: 2,
          borderRight: '1px solid #e0e0e0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          mb: 1.5,
          borderRadius: 3,
          mx: 0.5,
          px: 2.5,
          py: 2,
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: alpha('#15616d', 0.06),
            color: 'primary.main',
            transform: 'scale(1.04)',
            boxShadow: '0 2px 12px 0 rgba(21,97,109,0.10)',
          },
        },
      },
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Paw print SVG as a component
function PawPrintIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <circle cx="8" cy="12" r="3" fill="#15616d" fillOpacity="0.85" />
      <circle cx="24" cy="12" r="3" fill="#15616d" fillOpacity="0.85" />
      <ellipse cx="16" cy="24" rx="7" ry="5" fill="#15616d" fillOpacity="0.65" />
      <circle cx="12" cy="7" r="2" fill="#15616d" fillOpacity="0.85" />
      <circle cx="20" cy="7" r="2" fill="#15616d" fillOpacity="0.85" />
    </SvgIcon>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('demo_registered_user'); // Clear demo user on logout
    setUser(null);
    navigate('/login');
    handleCloseMenu(); // Close menu after logout
  };

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

  // CRUD handlers (these will operate on localStorage for the demo)
  const addPet = (pet) => {
    if (!pet.name || !pet.breed) return;
    setPets((prev) => [...prev, { ...pet, id: Date.now() }]);
    localStorage.setItem('pets', JSON.stringify([...pets, { ...pet, id: Date.now() }]));
  };

  const addActivity = (activity) => {
    if (!activity.pet || !activity.type || !activity.date) return;
    setActivities((prev) => [...prev, { ...activity, id: Date.now() }]);
    localStorage.setItem('activities', JSON.stringify([...activities, { ...activity, id: Date.now() }]));
  };

  const addHealthRecord = (record) => {
    if (!record.pet || !record.type || !record.date) return;
    setHealthRecords((prev) => [...prev, { ...record, id: Date.now() }]);
    localStorage.setItem('healthRecords', JSON.stringify([...healthRecords, { ...record, id: Date.now() }]));
  };

  const deletePet = (id) => {
    const updatedPets = pets.filter(pet => pet.id !== id);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));

    const updatedActivities = activities.filter(activity => activity.petId !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));

    const updatedRecords = healthRecords.filter(record => record.petId !== id);
    setHealthRecords(updatedRecords);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  const deleteActivity = (id) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const deleteHealthRecord = (id) => {
    const updatedRecords = healthRecords.filter(record => record.id !== id);
    setHealthRecords(updatedRecords);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  const editPet = (id, updatedPet) => {
    const updatedPets = pets.map(pet => pet.id === id ? { ...pet, ...updatedPet } : pet);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const editActivity = (id, updatedActivity) => {
    const updatedActivities = activities.map(activity => activity.id === id ? { ...activity, ...updatedActivity } : activity);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const editHealthRecord = (id, updatedRecord) => {
    const updatedRecords = healthRecords.map(record => record.id === id ? { ...record, ...updatedRecord } : record);
    setHealthRecords(updatedRecords);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  const adminEmail = 'admin@loomaterviseweb.com';

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        Lemmiklooma
      </Typography>
      <List>
        <ListItem disablePadding component={Link} to="/">
          <ListItemButton sx={{ textAlign: 'left' }}>
            <DashboardIcon sx={{ mr: 1, color: 'primary.main' }} />
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/pets">
          <ListItemButton sx={{ textAlign: 'left' }}>
            <PetsIcon sx={{ mr: 1, color: 'primary.main' }} />
            <ListItemText primary="Pets" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/activities">
          <ListItemButton sx={{ textAlign: 'left' }}>
            <FitnessCenterIcon sx={{ mr: 1, color: 'primary.main' }} />
            <ListItemText primary="Activities" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/healthrecords">
          <ListItemButton sx={{ textAlign: 'left' }}>
            <LocalHospitalIcon sx={{ mr: 1, color: 'primary.main' }} />
            <ListItemText primary="Health Records" />
          </ListItemButton>
        </ListItem>
        {user && user.email === adminEmail && (
          <ListItem disablePadding component={Link} to="/admin">
            <ListItemButton sx={{ textAlign: 'left' }}>
              <AdminPanelSettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <ListItemText primary="Admin Panel" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {/* --- Background Image with Blur and Dark Overlay --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -10, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1500&q=80"
          alt="Background dog"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(8px) brightness(0.45)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            transition: 'filter 0.4s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(21,33,56,0.55) 60%, rgba(21,97,109,0.35) 100%)',
            zIndex: 2,
          }}
        />
      </Box>
      {/* --- End Background --- */}
      <NotificationProvider>
        <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
          <AppBar component="nav" position="sticky" elevation={0} sx={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 1.5, display: { sm: 'none' }, color: 'primary.main' }}
                >
                  <MenuIcon />
                </IconButton>
                <PawPrintIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1, display: { xs: 'none', sm: 'inline' } }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' }, color: 'primary.main', fontWeight: 700 }}
                >
                  Loomatervise App
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button component={Link} to="/" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Dashboard</Button>
                <Button component={Link} to="/pets" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Pets</Button>
                <Button component={Link} to="/activities" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Activities</Button>
                <Button component={Link} to="/healthrecords" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Health Records</Button>
                {user && user.email === adminEmail && (
                  <Button component={Link} to="/admin" sx={{ color: 'secondary.main', fontWeight: 600, '&:hover': { bgcolor: 'secondary.light', color: 'white' } }}>Admin Panel</Button>
                )}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                {user ? (
                  <>
                    <Button
                      onClick={handleMenu}
                      color="inherit"
                      sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                      Welcome, {user.name}!
                    </Button>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={openMenu}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button component={Link} to="/login" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Login</Button>
                    <Button component={Link} to="/register" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}>Register</Button>
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ py: 3 }}>
            <Toolbar />
            <Box sx={{
              maxWidth: 1100,
              mx: 'auto',
              px: { xs: 2, sm: 3 },
              background: {
                xs: 'rgba(255,255,255,0.92)',
                sm: 'rgba(245,250,255,0.92)'
              },
              borderRadius: 6,
              boxShadow: '0 8px 32px 0 rgba(21,97,109,0.10)',
              backdropFilter: 'blur(4px)',
              mt: { xs: 2, sm: 4 },
              mb: 4,
            }}>
              <Routes>
                <Route path="/" element={<Dashboard pets={pets} activities={activities} healthRecords={healthRecords} />} />
                <Route path="/pets" element={<Pets pets={pets} addPet={addPet} deletePet={deletePet} editPet={editPet} />} />
                <Route path="/activities" element={<Activities pets={pets} activities={activities} addActivity={addActivity} deleteActivity={deleteActivity} editActivity={editActivity} />} />
                <Route path="/healthrecords" element={<HealthRecords pets={pets} healthRecords={healthRecords} addHealthRecord={addHealthRecord} deleteHealthRecord={deleteHealthRecord} editHealthRecord={editHealthRecord} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {user && user.email === adminEmail && (
                  <Route path="/admin" element={<AdminPanel />} />
                )}
              </Routes>
            </Box>
          </Box>
        </Box>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
