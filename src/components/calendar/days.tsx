import React from 'react';
import {
  format, addDays, startOfWeek,
} from 'date-fns';
import {
  Box, Typography,
} from '@mui/material';

interface IDaysProps {
  currentMonth: Date
  isDarkMode: boolean
}

export default function Cells({ currentMonth, isDarkMode }: IDaysProps) {
  console.log({ isDarkMode });
  const dateFormat = 'EEEE';
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
        gap: 1,
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
      p={2}
    >
      {days}
    </Box>
  );
}
