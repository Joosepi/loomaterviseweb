import React, { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Box, Grid, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Pets = ({ pets, addPet }) => {
  const [open, setOpen] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', image: '' });
  const [imagePreview, setImagePreview] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPet({ name: '', breed: '', image: '' });
    setImagePreview('');
  };

  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPet((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPet = () => {
    if (newPet.name && newPet.breed && newPet.image) {
      addPet(newPet);
      handleClose();
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Pets
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {pets.map((pet, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="220"
                image={pet.image}
                alt={pet.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {pet.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pet.breed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 32, right: 32, boxShadow: 4 }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Pet</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="pet-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="pet-image-upload">
              <IconButton color="primary" component="span">
                {imagePreview ? (
                  <Avatar src={imagePreview} sx={{ width: 80, height: 80 }} />
                ) : (
                  <PhotoCamera sx={{ fontSize: 40 }} />
                )}
              </IconButton>
            </label>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Pet Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newPet.name}
            onChange={handleChange}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPet} variant="contained" disabled={!(newPet.name && newPet.breed && newPet.image)}>
            Add Pet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets; 