import React, { useState, useRef, useEffect } from 'react';
import { AlertColor, Box, Button } from '@mui/material';
import TimedAlert from './TimedAlert';

export interface IAlert {
  type: AlertColor
  message: string
  id: string
}

const randomNumber = () => new Date().getTime();

interface IAlertHandler {
  contextAlerts: IAlert[]
}

function AlertHandler({ contextAlerts }:IAlertHandler) {
  const [alerts, setAlerts] = useState<IAlert[]>(contextAlerts);

  const alertsRef = useRef(alerts);
  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);

  const addAlert = (type:AlertColor, message:string, cAlerts:IAlert[]) => {
    setAlerts([...cAlerts, { type, message, id: `${message}${randomNumber()}` }]);
  };

  const dismissAlert = (idString:string) => {
    setAlerts(alertsRef.current.filter((alert) => `${alert.message}${alert.id}` !== idString));
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
          dismiss={dismissAlert}
        />
      ))}
      <Button onClick={() => addAlert(typeArr[Math.floor(Math.random() * 3)], 'added Alert!  !', alerts)}>
        Add alert.
      </Button>
    </Box>
  );
}

export default AlertHandler;
