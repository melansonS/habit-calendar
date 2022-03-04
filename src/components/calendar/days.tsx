import React from 'react';
import {
  format, addDays, startOfWeek,
} from 'date-fns';
import {
  Box, Typography,
} from '@mui/material';
import useBreakPoints from '../../utils/useBreakPoint';

interface IDaysProps {
  currentMonth: Date
}

export default function Days({ currentMonth }: IDaysProps) {
  const breakPoint = useBreakPoints();
  const dateFormat = ['xs', 'sm', 'md'].includes(breakPoint) ? 'EEE' : 'EEEE';
  const days = [];
  const startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <Box
        key={i}
      >
        <Typography align="center" fontWeight="600">
          {format(addDays(startDate, i), dateFormat)}
        </Typography>
      </Box>,
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 0.5, sm: 1 },
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
      pt={2}
      pb={2}
    >
      {days}
    </Box>
  );
}
