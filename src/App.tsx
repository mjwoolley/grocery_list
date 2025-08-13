import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import GroceryList from './components/GroceryList';
import InstallPrompt from './components/InstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Material Blue
    },
    secondary: {
      main: '#dc004e', // Material Pink
    },
    background: {
      default: '#f5f5f5', // Light Gray
      paper: '#ffffff', // White
    },
    text: {
      primary: '#212121', // Dark Gray
      secondary: '#757575', // Medium Gray
    },
    success: {
      main: '#4caf50', // Green
    },
    error: {
      main: '#f44336', // Red
    },
  },
  typography: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    h4: {
      fontWeight: 600, // Headers: Roboto, 600 weight
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400, // Body: Roboto, 400 weight
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 500, // Buttons: Roboto, 500 weight
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
});

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OfflineIndicator />
      {user ? <GroceryList /> : <AuthForm />}
      <InstallPrompt />
    </ThemeProvider>
  );
}

export default App;