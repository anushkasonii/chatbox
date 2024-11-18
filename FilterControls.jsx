import React, { useState } from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Checkbox,
  ListSubheader,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StudentRoomsDialog from './StudentRoomsDialog';

const rooms = [
  { id: 'camp', label: 'Camp', letter: 'C', color: '#E91E63', students: [
    { id: 1, name: 'Alex Johnson' },
    { id: 2, name: 'Sarah Williams' },
    { id: 3, name: 'Mike Brown' },
    { id: 4, name: 'Emma Davis' },
    { id: 5, name: 'James Wilson' },
  ]},
  { id: 'daycare', label: 'DayCare', letter: 'D', color: '#FFC107', students: [
    { id: 6, name: 'Olivia Moore' },
    { id: 7, name: 'William Taylor' },
    { id: 8, name: 'Sophia Anderson' },
    { id: 9, name: 'Lucas Martin' },
    { id: 10, name: 'Ava Thompson' },
  ]},
  { id: 'lkg', label: 'LKG', letter: 'L', color: '#3F51B5', students: [
    { id: 11, name: 'Ethan Clark' },
    { id: 12, name: 'Isabella White' },
    { id: 13, name: 'Mason Lee' },
    { id: 14, name: 'Charlotte King' },
    { id: 15, name: 'Henry Wright' },
  ]},
  { id: 'playschool', label: 'PlaySchool', letter: 'P', color: '#E91E63', students: [
    { id: 16, name: 'Amelia Scott' },
    { id: 17, name: 'Oliver Green' },
    { id: 18, name: 'Mia Baker' },
    { id: 19, name: 'Daniel Hill' },
    { id: 20, name: 'Sofia Adams' },
  ]},
  { id: 'demo', label: 'Demo Room', letter: 'D', color: '#E91E63', students: [
    { id: 21, name: 'Liam Nelson' },
    { id: 22, name: 'Aria Hall' },
    { id: 23, name: 'Noah Young' },
    { id: 24, name: 'Chloe Allen' },
    { id: 25, name: 'Elijah Cook' },
  ]},
];

function FilterControls({ orderBy, setOrderBy }) {
  const [roomsDialogOpen, setRoomsDialogOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleRoomChange = (event) => {
    const newSelectedRooms = event.target.value;
    setSelectedRooms(newSelectedRooms);
    // Clear selected students when rooms change
    setSelectedStudents([]);
  };

  const handleStudentChange = (event) => {
    const value = event.target.value;
    setSelectedStudents(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelectAllStudentsInRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const roomStudentIds = room.students.map(student => student.id);
    const alreadyAllSelected = room.students.every(student => 
      selectedStudents.includes(student.id)
    );

    if (alreadyAllSelected) {
      // Deselect all students in this room
      setSelectedStudents(selectedStudents.filter(id => !roomStudentIds.includes(id)));
    } else {
      // Select all students in this room
      const newSelected = [...new Set([...selectedStudents, ...roomStudentIds])];
      setSelectedStudents(newSelected);
    }
  };

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(rooms);
    setRoomsDialogOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {/* Room Dropdown */}
        <FormControl
          sx={{
            flex: 1,
            flexBasis: '30%',
          }}
        >
          <InputLabel>Room</InputLabel>
          <Select
            multiple
            value={selectedRooms}
            onChange={handleRoomChange}
            label="Room"
            renderValue={(selected) => `${selected.length} rooms selected`}
          >
            {rooms.map((room) => (
              <MenuItem 
                key={room.id} 
                value={room}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  bgcolor: selectedRooms.some(r => r.id === room.id) ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: selectedRooms.some(r => r.id === room.id) ? 'action.selected' : 'action.hover',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
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
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Student Dropdown */}
        <FormControl
          sx={{
            flex: 1,
            flexBasis: '30%',
          }}
        >
          <InputLabel>Student</InputLabel>
          <Select
            multiple
            value={selectedStudents}
            onChange={handleStudentChange}
            label="Student"
            renderValue={(selected) => `${selected.length} students selected`}
          >
            {selectedRooms.map((room) => [
              <ListSubheader
                key={`${room.id}-header`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: room.color,
                    color: 'white',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  {room.letter}
                </Box>
                <Typography>{room.label}</Typography>
                <Checkbox
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAllStudentsInRoom(room.id);
                  }}
                  checked={room.students.every(student => selectedStudents.includes(student.id))}
                  indeterminate={
                    room.students.some(student => selectedStudents.includes(student.id)) &&
                    !room.students.every(student => selectedStudents.includes(student.id))
                  }
                />
              </ListSubheader>,
              ...room.students.map((student) => (
                <MenuItem
                  key={student.id}
                  value={student.id}
                  sx={{ pl: 4 }}
                >
                  <Checkbox checked={selectedStudents.includes(student.id)} />
                  <ListItemText primary={student.name} />
                </MenuItem>
              ))
            ])}
          </Select>
        </FormControl>

        {/* Student Status */}
        <FormControl
          fullWidth
          sx={{
            flex: 1,
            flexBasis: '30%',
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