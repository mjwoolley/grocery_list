import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';
import {
  Delete as DeleteIcon
} from '@mui/icons-material';
import { GroceryItem as GroceryItemType } from '../types';

interface GroceryItemProps {
  item: GroceryItemType;
  onToggle: (itemId: string, completed: boolean) => void;
  onDelete: (itemId: string) => void;
  showDelete?: boolean;
}

const GroceryItem: React.FC<GroceryItemProps> = ({
  item,
  onToggle,
  onDelete,
  showDelete = true
}) => {
  const handleToggle = () => {
    onToggle(item.id, !item.completed);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        showDelete && (
          <IconButton 
            edge="end" 
            onClick={handleDelete}
            size="small"
            sx={{ 
              opacity: 0.7,
              '&:hover': { 
                opacity: 1,
                color: 'error.main' 
              },
              minWidth: 48,
              minHeight: 48
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )
      }
    >
      <ListItemButton 
        onClick={handleToggle} 
        sx={{ 
          py: 1.5,
          px: 2,
          transition: 'background-color 0.2s ease',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 48 }}>
          <Checkbox
            edge="start"
            checked={item.completed}
            tabIndex={-1}
            disableRipple
            sx={{ 
              color: item.completed ? '#4caf50' : 'rgba(0, 0, 0, 0.54)',
              '&.Mui-checked': {
                color: '#4caf50'
              },
              '& .MuiSvgIcon-root': { 
                fontSize: 24 
              }
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                textDecoration: item.completed ? 'line-through' : 'none',
                color: item.completed ? '#757575' : '#212121',
                fontWeight: 400,
                fontFamily: 'Roboto'
              }}
            >
              {item.name}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default GroceryItem;