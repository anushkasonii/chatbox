import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import StudentRoomsDialog from './StudentRoomsDialog';

export default function NewMessage({ open, onClose, onSubmit }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [sendSMS, setSendSMS] = useState(false);
  const [roomsDialogOpen, setRoomsDialogOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([{ id: 'playschool', label: 'PlaySchool', letter: 'P', color: '#E91E63' }]);
  const maxCharacters = 300;
  

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit({ message, selectedRooms });
    }
  };

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(rooms);
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxCharacters) {
      setMessage(value);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontSize: "27px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Message Parent Rooms
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ color: '#938F99', fontWeight: 'bold' }}>
                Recipients:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {selectedRooms.map((room) => (
                  <Box
                    key={room.id}
                    sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      bgcolor: room.color,
                      color: 'white',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5
                    }}
                  >
                    {room.letter}
                  </Box>
                ))}
              </Box>
            </Box>
            <IconButton onClick={() => setRoomsDialogOpen(true)} size="small">
              <EditIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="body1" sx={{ color: '#938F99', fontWeight: 'bold' }}>
              Type:
            </Typography>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                value={type}
                onChange={handleTypeChange}
                displayEmpty
              >
                <MenuItem value=""> <em>Alert</em> </MenuItem>
                <MenuItem value="notice"> <em>Notice</em> </MenuItem>
                <MenuItem value="payment"> <em>Payment</em> </MenuItem>
                <MenuItem value="holiday"> <em>Holiday</em> </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControlLabel
            control={
              <Checkbox 
                checked={sendSMS}
                onChange={(e) => setSendSMS(e.target.checked)}
              />
            }
            label="Send SMS Message"
            sx={{ mb: 1 }}
          />

          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ color: '#938F99', fontWeight: 'bold',  }}>
              File:
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{fontSize:'15px'}}

            >
              Add file
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            helperText={`${maxCharacters - message.length} characters remaining`}
            inputProps={{ maxLength: maxCharacters }}
          />
        </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}
          sx={{
                color: "#48454e",
                fontWeight: "bold",
                backgroundColor: "transparent",
                marginBottom: "15px",
                fontSize:'17px'
              }}
         >
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{
                borderRadius: "20px",
                marginBottom: "15px",
                marginRight: "24px",
                borderColor: "#1FB892",
                color: "#fef7ff",
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#1FB892",
                alignItems: "center",
                "&:hover": {
                  borderColor: "#1FB892",
                  backgroundColor: "white",
                  color: "#1FB892",
                },
              }}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

      <StudentRoomsDialog
        open={roomsDialogOpen}
        onClose={() => setRoomsDialogOpen(false)}
        onSelect={handleRoomSelect}
        selectedRooms={selectedRooms}
      />
    </>
  );
}