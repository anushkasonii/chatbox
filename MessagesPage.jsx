import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Stack,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import FilterControls from './FilterControls';
import MessageList from './MessageList';
import ChatDrawer from './ChatDrawer'; // We'll assume this is the component displaying the chat for the selected user.

function MessagesPage() {
  const [tab, setTab] = useState(0);
  const [orderBy, setOrderBy] = useState('recent');
  const [selectedUser, setSelectedUser] = useState(null);

  // Default user selection (can be modified or adjusted)
  const initialUser = { id: 1, avatar: 'AP', name: 'Angelin Pore' };

  // If no user is selected, default to the first user in the list
  const handleMessageClick = (user) => {
    setSelectedUser(user);
  };

  // Set the default user on initial load if no user is selected
  React.useEffect(() => {
    if (!selectedUser) {
      setSelectedUser(initialUser);
    }
  }, [selectedUser]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flex: 1 }}>
            Messages
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#4F46E5',
              '&:hover': { bgcolor: '#4338CA' },
              px: 3,
            }}
          >
            New Message
          </Button>
        </Stack>

        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Parents" />
          <Tab label="Staff" />
        </Tabs>

        <FilterControls orderBy={orderBy} setOrderBy={setOrderBy} />
      </Box>

      <Grid container spacing={2}>
        {/* Left side - Message List (User List) */}
        <Grid item xs={12} sm={4}>
          <MessageList onMessageClick={handleMessageClick} />
        </Grid>

        {/* Right side - Chat Box (Selected User's Chat) */}
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: 1,
              borderColor: 'divider',
              padding: 2,
            }}
          >
            {/* Chat for the selected user */}
            {selectedUser ? (
              <ChatDrawer user={selectedUser} />
            ) : (
              <Typography variant="h6">Select a user to chat</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MessagesPage;
