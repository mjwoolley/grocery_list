import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material';
import {
  AccountCircle,
  Add
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const GroceryList: React.FC = () => {
  const [newItem, setNewItem] = useState('');
  const { user, signOut } = useAuth();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    // TODO: Add item to Firebase
    console.log('Adding item:', newItem);
    setNewItem('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Grocery List
          </Typography>
          <IconButton
            color="inherit"
            onClick={signOut}
            title={`Signed in as ${user?.email}`}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <form onSubmit={handleAddItem}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Add new item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                size="small"
                autoFocus
              />
              <IconButton 
                type="submit" 
                color="primary"
                disabled={!newItem.trim()}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              >
                <Add />
              </IconButton>
            </Box>
          </form>
        </Paper>

        {/* TODO: Add items list */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            🛒
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your grocery list is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your first item above
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GroceryList;