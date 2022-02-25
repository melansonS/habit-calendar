import React, { useEffect } from 'react';
import { Alert } from '@mui/material';
import { IAlert } from './AlertHandler';

export interface ITimedAlert extends IAlert{
  dismiss: (idString:string) => void
}

function TimedAlert({
  message, type, id, dismiss,
}: ITimedAlert) {
  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss(`${message}${id}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      severity={type}
      onClick={() => dismiss(`${message}${id}`)}
      sx={{ ':hover': { cursor: 'pointer' } }}
    >
      {message}
    </Alert>
  );
}

export default TimedAlert;
