import React from 'react';
import { Box } from '@mui/material';
import TimedAlert from './TimedAlert';
import { useAlert } from '../context/alertContext';

function AlertContainer() {
  const { alerts, dismissAlert } = useAlert();

  const handleDismissAlert = (idString:string) => {
    dismissAlert(idString);
  };

  return (
    <Box
      style={{
        width: '40%',
        position: 'fixed',
        zIndex: 5,
        bottom: '30px',
        left: '30px',
      }}
    >
      {alerts.map((alert) => (
        <TimedAlert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          message={alert.message}
          dismiss={handleDismissAlert}
        />
      ))}
    </Box>
  );
}

export default AlertContainer;
