import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const rooms = [
  { id: 'camp', label: 'Camp', letter: 'C', color: '#E91E63' },
  { id: 'daycare', label: 'DayCare', letter: 'D', color: '#FFC107' },
  { id: 'lkg', label: 'LKG', letter: 'L', color: '#3F51B5' },
  { id: 'playschool', label: 'PlaySchool', letter: 'P', color: '#E91E63' },
  { id: 'demo', label: 'Demo Room', letter: 'D', color: '#E91E63' },
];

export default function StudentRoomsDialog({ open, onClose, onSelect, selectedRooms }) {
  const [selected, setSelected] = React.useState(selectedRooms || []);

  const handleToggleRoom = (room) => {
    const newSelected = selected.some(r => r.id === room.id)
      ? selected.filter(r => r.id !== room.id)
      : [...selected, room];
    setSelected(newSelected);
  };

  const handleSelectAll = () => {
    setSelected(rooms);
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleNext = () => {
    onSelect(selected);
    onClose();
  };

  const isSelected = (roomId) => selected.some(r => r.id === roomId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
            Select Student Rooms
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {rooms.slice(0, 4).map((room) => (
            <Grid item xs={3} key={room.id}>
              <Box 
                sx={{ 
                  textAlign: 'center',
                  p: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: isSelected(room.id) ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  '&:hover': {
                    bgcolor: isSelected(room.id) ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  },
                  
                }}
                onClick={() => handleToggleRoom(room)}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: room.color,
                    color: 'white',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 1,
                  }}
                >
                  {room.letter}
                </Box>
                <Typography variant="body2">{room.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 2 }}>
          {rooms.slice(4).map((room) => (
            <Box
              key={room.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: 1,
                cursor: 'pointer',
                bgcolor: isSelected(room.id) ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                '&:hover': {
                  bgcolor: isSelected(room.id) ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                },
                width: 'auto', 
                maxWidth: '200px', 
                
              }}
              onClick={() => handleToggleRoom(room)}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: room.color,
                  color: 'white',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {room.letter}
              </Box>
              <Typography>{room.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="text" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button variant="text" onClick={handleDeselectAll}>
            Deselect All
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleNext}
          sx={{ bgcolor: '#4F46E5', '&:hover': { bgcolor: '#4338CA' } }}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}