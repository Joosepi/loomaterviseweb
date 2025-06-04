import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Grid, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const heroDog = 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80';
const emptyActivity = 'https://undraw.co/api/illustrations/undraw_workout_gcgu.svg';

const activityTypes = ['Walk', 'Training', 'Play', 'Other'];

const Activities = ({ pets, activities, addActivity, deleteActivity, editActivity }) => {
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({ pet: '', type: '', date: '', duration: '', notes: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewActivity({ pet: '', type: '', date: '', duration: '', notes: '' });
  };

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleAddActivity = () => {
    if (newActivity.pet && newActivity.type && newActivity.date) {
      addActivity(newActivity);
      handleClose();
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, px: 2, gap: 6, background: 'linear-gradient(90deg, #f9f9f9 60%, #eaf6f6 100%)' }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            Activities
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Log and view all your pets' activities.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={heroDog} alt="Active dog" style={{ width: '100%', maxWidth: 340, borderRadius: 24, boxShadow: '0 8px 32px rgba(21,97,109,0.10)' }} />
        </Box>
      </Box>
      {/* Activity Cards or Empty State */}
      {activities.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <img src={emptyActivity} alt="No activities" style={{ width: 180, marginBottom: 24 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No activities yet. Add your first activity!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ fontWeight: 600, px: 4, py: 1.2 }}>
            Add Activity
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 1, maxWidth: 1100, mx: 'auto' }}>
          {activities.map((activity, idx) => (
            <Grid xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ borderRadius: 5, boxShadow: 4, height: '100%', transition: 'transform 0.18s, box-shadow 0.18s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: 8 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, boxShadow: 2 }}>
                    <FitnessCenterIcon sx={{ fontSize: 36, color: '#fff' }} />
                  </Avatar>
                </Box>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{activity.pet}</Typography>
                  <Typography variant="body1" color="text.secondary">{activity.type}</Typography>
                  <Typography variant="body2">Date: {activity.date}</Typography>
                  <Typography variant="body2">Duration: {activity.duration}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{activity.notes}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 32, right: 32, boxShadow: 4 }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel id="pet-label">Pet</InputLabel>
            <Select
              labelId="pet-label"
              name="pet"
              value={newActivity.pet}
              label="Pet"
              onChange={handleChange}
            >
              {pets.map((pet, idx) => (
                <MenuItem value={pet.name} key={idx}>{pet.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={newActivity.type}
              label="Type"
              onChange={handleChange}
            >
              {activityTypes.map((type) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newActivity.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (e.g. 30 min)"
            type="text"
            fullWidth
            variant="outlined"
            value={newActivity.duration}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="outlined"
            value={newActivity.notes}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddActivity} variant="contained" disabled={!(newActivity.pet && newActivity.type && newActivity.date)}>
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Activities; 