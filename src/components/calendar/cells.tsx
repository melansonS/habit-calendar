import React from 'react';
import {
  format, addDays, startOfWeek,
  endOfWeek,
  endOfMonth, startOfMonth,
} from 'date-fns';
import {
  styled, Box, Typography, Paper,
} from '@mui/material';

interface ICellsProps {
  currentMonth: Date
  today: Date
  isDarkMode: boolean
}

const CellsContainer = styled(Paper)`
`;

const Row = styled(Box)`
`;

const Cell = styled(Box)`
  height: 5rem;
  position: relative;
  
  :hover {
    background-color: ${({ isDarkMode }: {isDarkMode: boolean}) => (isDarkMode ? '#333' : '#eee')};
  }
`;

export default function Cells({ currentMonth, today, isDarkMode }: ICellsProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';
  let j = 0;
  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = format(day, dateFormat);
      days.push(
        <Cell
          isDarkMode={isDarkMode}
          key={`${day.getDate()}-key?`}
        >
          <Typography style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
            {formattedDate}
          </Typography>
          {today.getTime() === day.getTime() && <span>today??</span>}
        </Cell>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <Row
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
        }}
        key={`key-${day.getDate()}-${j}`}
      >
        {days}
      </Row>,
    );
    days = [];
    j += 1;
  }

  return <CellsContainer elevation={6}>{rows}</CellsContainer>;
}
