import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Grid, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const heroDog = 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80';
const emptyHealth = 'https://undraw.co/api/illustrations/undraw_medicine_b1ol.svg';

const recordTypes = ['Vaccination', 'Vet Visit', 'Medication', 'Other'];

const HealthRecords = ({ pets, healthRecords, addHealthRecord, deleteHealthRecord, editHealthRecord }) => {
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ pet: '', type: '', date: '', notes: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewRecord({ pet: '', type: '', date: '', notes: '' });
  };

  const handleChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleAddRecord = () => {
    if (newRecord.pet && newRecord.type && newRecord.date) {
      addHealthRecord(newRecord);
      handleClose();
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', py: 6, px: 2, gap: 6, background: 'linear-gradient(90deg, #f9f9f9 60%, #eaf6f6 100%)' }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            Health Records
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Keep track of your pets' vaccinations, vet visits, and more.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={heroDog} alt="Dog health" style={{ width: '100%', maxWidth: 340, borderRadius: 24, boxShadow: '0 8px 32px rgba(21,97,109,0.10)' }} />
        </Box>
      </Box>
      {/* Health Record Cards or Empty State */}
      {healthRecords.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <img src={emptyHealth} alt="No health records" style={{ width: 180, marginBottom: 24 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No health records yet. Add your first record!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} sx={{ fontWeight: 600, px: 4, py: 1.2 }}>
            Add Health Record
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 1, maxWidth: 1100, mx: 'auto' }}>
          {healthRecords.map((record, idx) => (
            <Grid xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ borderRadius: 5, boxShadow: 4, height: '100%', transition: 'transform 0.18s, box-shadow 0.18s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: 8 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: 2 }}>
                    <LocalHospitalIcon sx={{ fontSize: 36, color: '#fff' }} />
                  </Avatar>
                </Box>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{record.pet}</Typography>
                  <Typography variant="body1" color="text.secondary">{record.type}</Typography>
                  <Typography variant="body2">Date: {record.date}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{record.notes}</Typography>
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
        <DialogTitle>Add Health Record</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel id="pet-label">Pet</InputLabel>
            <Select
              labelId="pet-label"
              name="pet"
              value={newRecord.pet}
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
              value={newRecord.type}
              label="Type"
              onChange={handleChange}
            >
              {recordTypes.map((type) => (
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
            value={newRecord.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="outlined"
            value={newRecord.notes}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddRecord} variant="contained" disabled={!(newRecord.pet && newRecord.type && newRecord.date)}>
            Add Record
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HealthRecords; 