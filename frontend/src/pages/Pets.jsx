import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  CardMedia,
  CardActions,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import { useNotification } from '../context/NotificationContext';
import SvgIcon from '@mui/material/SvgIcon';

const heroDog = 'https://images.unsplash.com/photo-1518715308788-3005759c61d3?auto=format&fit=crop&w=900&q=80';
const emptyDog = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80';

// Paw print SVG as a component
function PawPrintIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <circle cx="8" cy="12" r="3" fill="#15616d" fillOpacity="0.18" />
      <circle cx="24" cy="12" r="3" fill="#15616d" fillOpacity="0.18" />
      <ellipse cx="16" cy="24" rx="7" ry="5" fill="#15616d" fillOpacity="0.13" />
      <circle cx="12" cy="7" r="2" fill="#15616d" fillOpacity="0.22" />
      <circle cx="20" cy="7" r="2" fill="#15616d" fillOpacity="0.22" />
    </SvgIcon>
  );
}

const Pets = ({ pets, addPet, deletePet, editPet }) => {
  const { showNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [newPet, setNewPet] = useState({ name: '', breed: '', image: '' });

  const handleOpen = () => {
    setEditingPet(null);
    setNewPet({ name: '', breed: '', image: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPet(null);
    setNewPet({ name: '', breed: '', image: '' });
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setNewPet(pet);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deletePet(id);
    showNotification('Pet deleted successfully', 'success');
  };

  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newPet.name || !newPet.breed) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    if (editingPet) {
      editPet(editingPet.id, newPet);
      showNotification('Pet updated successfully', 'success');
    } else {
      addPet(newPet);
      showNotification('Pet added successfully', 'success');
    }
    handleClose();
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, px: 2, gap: 6, background: 'linear-gradient(90deg, #f9f9f9 60%, #eaf6f6 100%)', borderRadius: 5, mb: 4 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', fontFamily: 'Inter, Roboto, Arial, sans-serif', mr: 1 }}>
              Your Pets
            </Typography>
            <PawPrintIcon sx={{ fontSize: 36, color: 'primary.main', opacity: 0.7 }} />
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Add, edit, and manage all your beloved pets in one place.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={heroDog}
            alt="Dog"
            style={{ width: 180, height: 180, objectFit: 'cover', borderRadius: '50%', boxShadow: '0 8px 32px rgba(21,97,109,0.10)' }}
            onError={e => { e.target.onerror = null; e.target.src = emptyDog; }}
          />
        </Box>
      </Box>
      {/* Pet Cards or Empty State */}
      {pets.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8, position: 'relative', minHeight: 260 }}>
          {/* Paw print watermark */}
          <PawPrintIcon sx={{
            fontSize: 180,
            position: 'absolute',
            left: '50%',
            top: '30px',
            transform: 'translateX(-50%)',
            opacity: 0.13,
            zIndex: 0
          }} />
          <img src={emptyDog} alt="No pets" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%', marginBottom: 24, boxShadow: '0 4px 16px rgba(21,97,109,0.10)', position: 'relative', zIndex: 1 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
            No pets yet. Add your first pet!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ fontWeight: 600, px: 4, py: 1.2, position: 'relative', zIndex: 1 }}>
            Add Pet
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card sx={{
                borderRadius: 5,
                boxShadow: '0 8px 32px 0 rgba(21,97,109,0.10)',
                height: '100%',
                transition: 'transform 0.18s, box-shadow 0.18s',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)',
                '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: 8 }
              }}>
                <Box sx={{
                  height: 6,
                  width: '100%',
                  borderRadius: '5px 5px 0 0',
                  background: 'linear-gradient(90deg, #15616d 0%, #6ca965 100%)',
                  mb: 2
                }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: 2 }}>
                    <PetsIcon sx={{ fontSize: 36, color: '#fff' }} />
                  </Avatar>
                </Box>
                <CardMedia
                  component="img"
                  height="180"
                  image={pet.image || emptyDog}
                  alt={pet.name}
                  sx={{ objectFit: 'cover', borderRadius: 3, mx: 2, mt: 2 }}
                  onError={e => { e.target.onerror = null; e.target.src = emptyDog; }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{pet.name}</Typography>
                  <Typography variant="body1" color="text.secondary">{pet.breed}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <IconButton onClick={() => handleEdit(pet)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pet.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 32, right: 32, boxShadow: 4 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPet ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Pet Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newPet.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="breed"
            label="Breed"
            type="text"
            fullWidth
            variant="outlined"
            value={newPet.breed}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newPet.image}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPet ? 'Update' : 'Add'} Pet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets; 