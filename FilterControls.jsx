import React, { useState } from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import StudentRoomsDialog from './StudentRoomsDialog';

function FilterControls({ orderBy, setOrderBy }) {
  const [roomsDialogOpen, setRoomsDialogOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false); // Added state for Student Dialog
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedRooms(value);  // Simply set the value directly without needing Array.isArray
  };
  

  const handleRoomSelect = (room) => {
    setSelectedRooms((prevRooms) => {
        if (prevRooms.includes(room)) {
          return prevRooms.filter((r) => r !== room); // Remove the room if already selected
        } else {
          return [...prevRooms, room]; // Add the room if not selected
        }
      });
    setRoomsDialogOpen(false); // Close the dialog after selection
  };
  
  

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {/* Room */}
        <Box
          sx={{
            flex: 1,
            flexBasis: '30%', // Equal width for Room, Student, and Student Status
          }}
        >
          <Box
            onClick={() => setRoomsDialogOpen(true)}
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: 1,
              p: 2,
              width: '100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                borderColor: 'black',
              },
            }}
          >
            <Typography color="text.secondary">
            {selectedRooms.length ? `${selectedRooms.length} rooms selected` : 'Room'}
            </Typography>


            
          </Box>
        </Box>

        {/* Student */}
        <Box
          sx={{
            flex: 1,
            flexBasis: '30%', // Equal width for Room, Student, and Student Status
          }}
          onClick={() => setStudentDialogOpen(true)}
        >
          <Box
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: 1,
              p: 2,
              width: '100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                borderColor: 'black',
              },
            }}
          >
            <Typography color="text.secondary">Student</Typography>
          </Box>
        </Box>

        {/* Student Status */}
        <FormControl
          fullWidth
          sx={{
            flex: 1,
            flexBasis: '30%', // Equal width for Room, Student, and Student Status
          }}
        >
          <InputLabel>Student status</InputLabel>
          <Select label="Student status" value="">
            <MenuItem value="">All Statuses</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Typography component="span" color="text.secondary">
          Order by
        </Typography>
        <Select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          size="small"
          sx={{ ml: 1 }}
        >
          <MenuItem value="recent">Most recent</MenuItem>
          <MenuItem value="oldest">Unread</MenuItem>
          
        </Select>
      </Box>

      {/* Student Dialog */}
      <Dialog
        open={studentDialogOpen}
        onClose={() => setStudentDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Select Student
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setStudentDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="select-room-label">Select Rooms</InputLabel>
              <Select
                labelId="select-room-label"
                id="select-room"
                multiple
                value={selectedRooms || []}
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((room) => (
                      <Chip key={room} label={room} />
                    ))}
                  </Box>
                )}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E0E0E0', // Optional: customize border color
                  },
                }}
              >
                <MenuItem value="camp1">Camp</MenuItem>
                <MenuItem value="camp2">Daycare</MenuItem>
                <MenuItem value="camp3">LKG</MenuItem>
                <MenuItem value="camp4">Playschool</MenuItem>
                <MenuItem value="camp5">Demo Room</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#E0E0E0' }}>GK</Avatar>
            <Typography>Lane Gilmore</Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Avatar sx={{ bgcolor: '#E0E0E0' }}>TA</Avatar>
            <Typography>Hannah Bakers</Typography>
          </Stack>
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
            borderTop: '1px solid #E0E0E0',
            bgcolor: '#F8F8F8',
          }}
        >
          <Button onClick={() => setStudentDialogOpen(false)} sx={{ fontSize: '17px' }}>
            Cancel
          </Button>
        </Box>
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

export default FilterControls;
