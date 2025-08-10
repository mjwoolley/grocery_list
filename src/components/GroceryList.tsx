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
  Button,
  List,
  Divider,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade
} from '@mui/material';
import {
  AccountCircle,
  Add,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useGroceryItems } from '../hooks/useGroceryItems';
import GroceryItem from './GroceryItem';

const GroceryList: React.FC = () => {
  const [newItem, setNewItem] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { user, signOut } = useAuth();
  const {
    activeItems,
    completedItems,
    loading,
    error,
    addItem,
    toggleItem,
    deleteItem,
    clearCompletedItems
  } = useGroceryItems();

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    await addItem(newItem);
    setNewItem('');
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery List
            </Typography>
            <IconButton color="inherit" onClick={signOut}>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" elevation={4} sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              textAlign: 'center',
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Roboto'
            }}
          >
            Grocery List
          </Typography>
          <IconButton
            color="inherit"
            onClick={signOut}
            title={`Signed in as ${user?.email}`}
            sx={{ position: 'absolute', right: 16 }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: '#ffffff',
            px: 2,
            py: 1,
            mb: 2,
            borderRadius: 2
          }}
        >
          <form onSubmit={handleAddItem}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Add new item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                variant="outlined"
                size="medium"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '&:hover fieldset': {
                      borderColor: '#1976d2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2'
                    }
                  }
                }}
              />
              <IconButton 
                type="submit" 
                disabled={!newItem.trim()}
                sx={{ 
                  color: '#1976d2',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.04)'
                  },
                  '&:disabled': {
                    color: 'grey.400'
                  }
                }}
              >
                <Add />
              </IconButton>
            </Box>
          </form>
        </Paper>

        <Fade in={activeItems.length > 0} timeout={300}>
          <Paper 
            elevation={1}
            sx={{ 
              mb: 2, 
              borderRadius: 2, 
              bgcolor: '#ffffff',
              display: activeItems.length === 0 ? 'none' : 'block'
            }}
          >
            <List sx={{ py: 0 }}>
              {activeItems.map((item, index) => (
                <Fade key={item.id} in timeout={200}>
                  <Box>
                    <GroceryItem
                      item={item}
                      onToggle={toggleItem}
                      onDelete={deleteItem}
                    />
                    {index < activeItems.length - 1 && (
                      <Divider sx={{ mx: 2 }} />
                    )}
                  </Box>
                </Fade>
              ))}
            </List>
          </Paper>
        </Fade>

        {completedItems.length > 0 && (
          <>
            <Accordion 
              expanded={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              elevation={1}
              sx={{ 
                mb: 2, 
                borderRadius: 2,
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0, mb: 2 }
              }}
            >
              <AccordionSummary
                expandIcon={showCompleted ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    minHeight: 48,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#757575',
                    fontWeight: 500,
                    fontFamily: 'Roboto'
                  }}
                >
                  Purchased ({completedItems.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, bgcolor: '#ffffff' }}>
                <List sx={{ py: 0 }}>
                  {completedItems.map((item, index) => (
                    <Box key={item.id}>
                      <GroceryItem
                        item={item}
                        onToggle={toggleItem}
                        onDelete={deleteItem}
                        showDelete={false}
                      />
                      {index < completedItems.length - 1 && (
                        <Divider sx={{ mx: 2 }} />
                      )}
                    </Box>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setShowClearDialog(true)}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  height: 48,
                  fontWeight: 500,
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1976d2',
                    bgcolor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Clear Purchased
              </Button>
            </Box>
          </>
        )}

        {activeItems.length === 0 && completedItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h1" sx={{ mb: 3, fontSize: '4rem' }}>
              🛒
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
              Your grocery list is empty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add your first item above
            </Typography>
          </Box>
        )}
      </Container>

      {/* Clear Purchased Items Confirmation Dialog */}
      <Dialog
        open={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Clear Purchased Items?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all {completedItems.length} purchased items? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => setShowClearDialog(false)}
            color="primary"
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await clearCompletedItems();
              setShowClearDialog(false);
            }}
            color="error"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Clear Items
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroceryList;