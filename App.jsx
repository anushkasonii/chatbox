import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MessagesPage from './Components/MessagesPage';
import CssBaseline from '@mui/material/CssBaseline';



const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessagesPage />
    </ThemeProvider>
  );
}

export default App;