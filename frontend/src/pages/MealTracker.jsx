import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl, List, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const heroDog = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80';

const foodTypes = ['Dry Food', 'Wet Food', 'Raw', 'Treat', 'Other'];

const MealTracker = ({ pets }) => {
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({ pet: '', foodType: '', amount: '', time: '', notes: '' });
  const [editingMealId, setEditingMealId] = useState(null);

  const handleOpen = () => {
    setEditingMealId(null);
    setNewMeal({ pet: '', foodType: '', amount: '', time: '', notes: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditingMealId(null);
    setNewMeal({ pet: '', foodType: '', amount: '', time: '', notes: '' });
  };

  const handleChange = (e) => {
    setNewMeal({ ...newMeal, [e.target.name]: e.target.value });
  };

  const handleAddOrEditMeal = () => {
    if (!newMeal.pet || !newMeal.foodType || !newMeal.amount || !newMeal.time) return;
    if (editingMealId) {
      setMeals(meals.map(m => m.id === editingMealId ? { ...newMeal, id: editingMealId } : m));
    } else {
      setMeals([{ ...newMeal, id: Date.now() }, ...meals]);
    }
    handleClose();
  };

  const handleEdit = (meal) => {
    setEditingMealId(meal.id);
    setNewMeal({ pet: meal.pet, foodType: meal.foodType, amount: meal.amount, time: meal.time, notes: meal.notes });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, px: 2, gap: 6, background: 'linear-gradient(90deg, #f9f9f9 60%, #ede7f6 100%)', borderRadius: 5, mb: 4 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', fontFamily: 'Inter, Roboto, Arial, sans-serif', mr: 1 }}>
              Meal Tracker
            </Typography>
            <RestaurantIcon sx={{ fontSize: 36, color: 'primary.main', opacity: 0.7 }} />
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Log meals, food types, and track your dog's diet history.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ fontWeight: 600, px: 4, py: 1.2, mt: 2 }} onClick={handleOpen}>
            Log New Meal
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={heroDog}
            alt="Dog eating"
            style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '50%', boxShadow: '0 8px 32px rgba(21,97,109,0.10)' }}
          />
        </Box>
      </Box>
      {/* Meal Log List */}
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
        <Card sx={{ borderRadius: 4, boxShadow: 4, p: 3, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.95)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
              Meal Log
            </Typography>
            {meals.length === 0 ? (
              <Typography color="text.secondary">
                No meals logged yet. Start by clicking "Log New Meal" above!
              </Typography>
            ) : (
              <List>
                {meals.map((meal) => (
                  <ListItem key={meal.id} alignItems="flex-start" sx={{ mb: 1, borderRadius: 2, boxShadow: '0 2px 8px rgba(21,97,109,0.06)' }}
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" aria-label="edit" color="primary" onClick={() => handleEdit(meal)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDelete(meal.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <FastfoodIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{meal.pet}</Typography>
                        <Typography variant="body2" color="text.secondary">{meal.foodType} • {meal.amount}</Typography>
                      </>}
                      secondary={<>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          <Typography variant="caption" color="text.secondary">{meal.time}</Typography>
                        </Box>
                        {meal.notes && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                            {meal.notes}
                          </Typography>
                        )}
                      </>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
      {/* Log Meal Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingMealId ? 'Edit Meal' : 'Log New Meal'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel id="pet-label">Pet</InputLabel>
            <Select
              labelId="pet-label"
              name="pet"
              value={newMeal.pet}
              label="Pet"
              onChange={handleChange}
            >
              {pets.map((pet, idx) => (
                <MenuItem value={pet.name} key={idx}>{pet.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="foodType-label">Food Type</InputLabel>
            <Select
              labelId="foodType-label"
              name="foodType"
              value={newMeal.foodType}
              label="Food Type"
              onChange={handleChange}
            >
              {foodTypes.map((type) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="amount"
            label="Amount (e.g. 1 cup)"
            type="text"
            fullWidth
            variant="outlined"
            value={newMeal.amount}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="time"
            label="Time"
            type="time"
            fullWidth
            variant="outlined"
            value={newMeal.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="notes"
            label="Notes (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={newMeal.notes}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrEditMeal} variant="contained" disabled={!(newMeal.pet && newMeal.foodType && newMeal.amount && newMeal.time)}>
            {editingMealId ? 'Save Changes' : 'Log Meal'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MealTracker; 