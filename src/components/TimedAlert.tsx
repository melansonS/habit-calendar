import React, { useEffect, useState } from 'react';
import { Alert, Box, LinearProgress } from '@mui/material';
import { IAlert } from '../context/alertContext';

export interface ITimedAlert extends IAlert{
  dismiss: (idString:string) => void
}

function TimedAlert({
  message, type, id, dismiss,
}: ITimedAlert) {
  const [progress, setProgress] = useState<number>(100);
  const displayLength = 3000;

  let interval :NodeJS.Timer;
  const clearAlertInterval = () => {
    dismiss(`${message}${id}`);
    clearInterval(interval);
  };

  useEffect(() => {
    interval = setInterval(() => {
      setProgress((oldProgress) => oldProgress - 1);
    }, displayLength / 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Css animation causes a slight delay between hitting 0 and the visual feedback... hence the '-20 buffer'
    // might need to be tweaked if the `displayLength` changes... need to find a better soliution for this.

    if (progress <= -20) clearAlertInterval();
  }, [progress]);

  return (
    <Box sx={{ width: '100%' }} pl={1} pr={1}>
      <Alert
        severity={type}
        onClick={() => dismiss(`${message}${id}`)}
        sx={{ width: '100%', mt: 2, ':hover': { cursor: 'pointer' } }}
      >

        {message}
      </Alert>
      <LinearProgress color={type} variant="determinate" value={progress} />
    </Box>
  );
}

export default TimedAlert;
