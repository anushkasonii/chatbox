import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

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
      <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, borderBottom: 1, borderColor: 'divider', marginTop: '-15px' }}>
        <Avatar sx={{ bgcolor: 'primary.light' }}>{user.avatar}</Avatar>
        <Typography variant="h6">{user.name}</Typography>
      </Stack>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {mockMessages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.isUser ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            {/* Sender and timestamp above message */}
            <Typography 
              variant="caption" 
              sx={{ 
                mb: 0.5,
                color: 'text.secondary',
                fontWeight: 'medium',
                px: 1
              }}
            >
              {message.sender} • {message.timestamp}
            </Typography>

            {/* Message box */}
            <Box
              sx={{
                maxWidth: '70%',
                bgcolor: message.isUser ? '#6248ae' : '#f2ecf5',
                color: message.isUser ? 'white' : 'text.primary',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="body1">
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