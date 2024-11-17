import React, { useState } from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
} from '@mui/material';
import StudentRoomsDialog from './StudentRoomsDialog';

function FilterControls({ orderBy, setOrderBy }) {
  const [roomsDialogOpen, setRoomsDialogOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(rooms);
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        

        <Box sx={{ flex: 1 }}>
          <Box 
            onClick={() => setRoomsDialogOpen(true)}
            sx={{ 
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: 1,
              p: 2,
              width:'100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                borderColor: 'black'
              }
            }}
          >
            <Typography color="text.secondary" >
              {selectedRooms.length ? `${selectedRooms.length} rooms selected` : ' Room'}
            </Typography>
            
          </Box>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Student</InputLabel>
          <Select label="Student" value="">
            <MenuItem value="">All Students</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
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
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>

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