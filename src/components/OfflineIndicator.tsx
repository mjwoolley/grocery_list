import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert
} from '@mui/material';

const OfflineIndicator: React.FC = () => {
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setShowOfflineAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    if (!navigator.onLine) {
      setShowOfflineAlert(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={showOfflineAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ top: 64 }} // Below the AppBar
    >
      <Alert 
        severity="warning"
        onClose={() => setShowOfflineAlert(false)}
        sx={{ width: '100%' }}
      >
        You're offline. Some features may not work until you reconnect.
      </Alert>
    </Snackbar>
  );
};

export default OfflineIndicator;