import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';

// Mock conversation for selected user
const mockMessages = [
  { id: 1, text: "Hello, how are you?", timestamp: "12:30 PM", isUser: false },
  { id: 2, text: "I'm good, thanks! How about you?", timestamp: "12:31 PM", isUser: true },
  { id: 3, text: "I'm doing well. Just wanted to check in.", timestamp: "12:32 PM", isUser: false },
];

function ChatDrawer({ open, onClose, selectedUser }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage('');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={onClose} edge="start">
              <CloseIcon />
            </IconButton>
            {selectedUser && (
              <>
                <Avatar sx={{ bgcolor: 'primary.light' }}>{selectedUser.avatar}</Avatar>
                <Typography variant="h6">{selectedUser.name}</Typography>
              </>
            )}
          </Stack>
        </Box>

        {/* Messages */}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
          {mockMessages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: message.isUser ? 'primary.main' : 'grey.100',
                  color: message.isUser ? 'white' : 'text.primary',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {message.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={!newMessage.trim()}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <SendIcon />
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ChatDrawer;
