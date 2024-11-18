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
  styled,
  ListSubheader,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Edit as EditIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import StudentRoomsDialog from './StudentRoomsDialog';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  

export default function NewMessage({ open, onClose, onSubmit }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [sendSMS, setSendSMS] = useState(false);
  const [roomsDialogOpen, setRoomsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const maxCharacters = 300;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit({ message, selectedRooms, selectedFiles });
    }
  };

  const handleRoomChange = (event) => {
    const newSelectedRooms = event.target.value;
    setSelectedRooms(newSelectedRooms);
    // Clear selected students when rooms change
    setSelectedStudents([]);
  };

  const handleRoomSelect = (rooms) => {
    setSelectedRooms(rooms);
    setRoomsDialogOpen(false);
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxCharacters) {
      setMessage(value);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
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
          Send A Message
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap :2  }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ color: '#938F99', fontWeight: 'bold',flexDirection: 'column' }}>
                Recipients:
              </Typography>
              {/* Room Dropdown */}
        <FormControl
          sx={{
            flex: 1,
            flexBasis: '30%',
            minWidth: '200px'
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
            </Box>
            {/* Student Dropdown */}
        <FormControl
          sx={{
            flex: 2,
            flexBasis: '30%',
            minWidth: '200px'
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
                    minWidth: '200 px',
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
                <MenuItem value=""><em>Alert</em></MenuItem>
                <MenuItem value="notice"><em>Notice</em></MenuItem>
                <MenuItem value="payment"><em>Payment</em></MenuItem>
                <MenuItem value="holiday"><em>Holiday</em></MenuItem>
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
            <Typography variant="body1" sx={{ color: '#938F99', fontWeight: 'bold' }}>
              File:
            </Typography>
            <Button
              component="label"
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{ fontSize: '15px' }}
            >
              Add file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            {selectedFiles.length > 0 && (
              <Typography variant="body2" sx={{ color: '#938F99' }}>
                {selectedFiles.length} file(s) selected
              </Typography>
            )}
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
          <Button 
            onClick={onClose}
            sx={{
              color: "#48454e",
              fontWeight: "bold",
              backgroundColor: "transparent",
              marginBottom: "15px",
              fontSize: '17px'
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