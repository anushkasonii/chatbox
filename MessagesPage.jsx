import React, { useState, useEffect } from 'react';
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
import ChatBox from './ChatBox'; 
import NewMessage from './NewMessage';

function MessagesPage() {
  const [tab, setTab] = useState(0);
  const [orderBy, setOrderBy] = useState('recent');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const initialUser = { id: 1, avatar: 'AP', name: 'Angelin Pore' };

  
  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  
  const handleMessageClick = (user) => {
    setSelectedUser(user);
  };
  const handleSubmit = () => {
    console.log("New message submitted!");  // Add any submit functionality you need
    handleClose();  // Close dialog after submission
  };


 
  useEffect(() => {
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
          variant="outlined"
          sx={{
            borderColor: "#1FB892",
            color: "#1FB892",
            fontSize: "17px",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: "20px",
            paddingX: 2.5,
            "&:hover": {
              borderColor: "#1FB892",
              backgroundColor: "#1FB892",
              color: "white",
            },
          }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
        NEW MESSAGE
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
              <ChatBox user={selectedUser} />
            ) : (
              <Typography variant="h6">Select a user to chat</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <NewMessage
        open={dialogOpen}  // Control dialog visibility based on this prop
        onClose={handleClose}  // Close dialog on click
        onSubmit={handleSubmit}  // Handle form submission
      />
    </Container>
  );
}

export default MessagesPage;