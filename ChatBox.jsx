import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Mock conversation for the selected user with added sender info
const mockMessages = [
  { id: 1, text: "Hello, when is the Annual day?", timestamp: "Today, 12:30 PM", sender: "Parent", isUser: false },
  { id: 2, text: "Hello, it is on 12th December, 2024", timestamp: "Today, 12:31 PM", sender: "Kyle (Staff)", isUser: true },
  { id: 3, text: "Okay! Thank you", timestamp: "Today, 12:32 PM", sender: "Parent", isUser: false },
];

function ChatBox({ user }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ bgcolor: 'primary.light' }}>{user.avatar}</Avatar>
        <Typography variant="h6">{user.name}</Typography>
      </Stack>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
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
              {/* Sender and timestamp */}
              <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 'bold' }}>
                {message.sender} - {message.timestamp}
              </Typography>

              {/* Message text */}
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {message.text}
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
  );
}

export default ChatBox;
