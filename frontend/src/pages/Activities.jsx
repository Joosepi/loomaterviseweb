import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Grid, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const activityTypes = ['Walk', 'Training', 'Play', 'Other'];

const Activities = ({ pets, activities, addActivity }) => {
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
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Activities
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {activities.map((activity, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.pet}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{activity.type}</Typography>
                <Typography variant="body2">Date: {activity.date}</Typography>
                <Typography variant="body2">Duration: {activity.duration}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{activity.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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