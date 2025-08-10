import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ShoppingCart
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;
    
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <ShoppingCart 
            sx={{ 
              fontSize: 48, 
              color: 'primary.main', 
              mb: 1 
            }} 
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Grocery List
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !email || !password}
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              isSignUp ? 'SIGN UP' : 'SIGN IN'
            )}
          </Button>

          <Typography variant="body2">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <Link
              component="button"
              variant="body2"
              onClick={toggleMode}
              type="button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthForm;