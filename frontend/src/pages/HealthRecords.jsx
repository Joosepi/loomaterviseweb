import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Grid, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const recordTypes = ['Vaccination', 'Vet Visit', 'Medication', 'Other'];

const HealthRecords = ({ pets, healthRecords, addHealthRecord }) => {
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
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Health Records
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {healthRecords.map((record, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{record.pet}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{record.type}</Typography>
                <Typography variant="body2">Date: {record.date}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{record.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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