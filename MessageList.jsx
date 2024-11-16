import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Typography,
} from '@mui/material';


const messages = [
  { id: 1, avatar: 'AP', name: 'Angelin Pore', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 2, avatar: 'AD', name: 'Alex Demo', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 3, avatar: '', name: 'Russ Demo', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 4, avatar: 'KU', name: 'Kale Ud', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 5, avatar: 'MD', name: 'Mia Demo', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 6, avatar: 'JJ', name: 'Jim Jo', message: 'Hello', timestamp: '12/27/2023, 5:35 PM' },
  { id: 7, avatar: 'TA', name: 'Tar', message: 'Hello', timestamp: '12/27/2023, 5:32 PM' },
];

function MessageList({ onMessageClick }) {
  return (
    <List>
      {messages.map((message) => (
        <ListItem
          key={message.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => onMessageClick(message)} 
         
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: message.avatar ? 'primary.light' : 'grey.400' }}>
              {message.avatar || message.name[0]} 
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {message.name}
                {message.isAdmin && (
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.50',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    Admin ⇒ {message.role}
                  </Typography>
                )}
              </Box>
            }
            secondary={
              <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{message.message}</span>
                <Typography variant="caption" color="text.secondary">
                  {message.timestamp}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default MessageList;
