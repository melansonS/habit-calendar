import React from 'react';
import { AlertColor, Box, Button } from '@mui/material';
import TimedAlert from './TimedAlert';
import { useAlert } from '../context/alertContext';
import now from '../utils/useNow';

function AlertContainer() {
  const { alerts, addAlert, dismissAlert } = useAlert();

  const handleAddAlert = (type:AlertColor, message:string) => {
    addAlert({ type, message, id: `${message}${now()}` });
  };

  const handleDismissAlert = (idString:string) => {
    dismissAlert(idString);
  };

  // TODO: remove this..
  const typeArr: AlertColor[] = ['error', 'info', 'success'];
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
      <Button onClick={() => handleAddAlert(typeArr[Math.floor(Math.random() * 3)], 'added Alert!  !')}>
        Add alert.
      </Button>
    </Box>
  );
}

export default AlertContainer;
