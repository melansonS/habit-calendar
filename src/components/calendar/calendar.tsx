import React, { useState } from 'react';
import {
  format, addMonths, subMonths,
  startOfDay,
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import Cells from './cells';
import Days from './days';

interface ICalendarProps {
  isDarkMode: boolean
}

export default function Calendar({ isDarkMode } : ICalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const headerDateFormat = 'MMMM yyyy';
  return (
    <Paper elevation={6} sx={{ p: 2, m: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Box>
          <Button onClick={prevMonth}>
            <ChevronLeftIcon />
          </Button>
        </Box>
        <Box>
          <Typography variant="h4">
            {format(currentMonth, headerDateFormat)}
          </Typography>
        </Box>
        <Box>
          <Button onClick={nextMonth}>
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Days currentMonth={currentMonth} isDarkMode={isDarkMode} />
      <Cells currentMonth={currentMonth} today={today} isDarkMode={isDarkMode} />
    </Paper>
  );
}
