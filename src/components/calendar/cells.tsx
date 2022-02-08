import React from 'react';
import {
  format, addDays, startOfWeek,
  endOfWeek,
  endOfMonth, startOfMonth,
} from 'date-fns';
import {
  styled, Box, Typography,
  useTheme as useMUITheme,
} from '@mui/material';

interface ICellsProps {
  currentMonth: Date
  today: Date
  isDarkMode: boolean
}

interface ICellProps {
  isToday?: boolean
  isChecked?: boolean
  isDarkMode: boolean
  primary: string
  secondary: string
}

const CellsContainer = styled(Box)`
`;

const Row = styled(Box)`
`;

const Cell = styled(Box)`
  height: 5rem;
  position: relative;
  background-color: ${({ isChecked, primary }:ICellProps) => (isChecked ? primary : 'inherit')};
  border: ${({ isToday, secondary } :ICellProps) => (isToday ? `2px solid ${secondary}` : 'none')};
  :hover {
    background-color: ${({ isDarkMode }:ICellProps) => (isDarkMode ? '#333' : '#eee')};
  }
`;

export default function Cells({ currentMonth, today, isDarkMode }: ICellsProps) {
  const { palette: { primary, secondary } } = useMUITheme();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const checkedDays = ['1643518800000', '1643518800000', '1643778000000', '1643864400000', today.getTime().toString()];

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
          primary={primary.main}
          secondary={secondary.main}
          isChecked={checkedDays.includes(day.getTime().toString())}
          isDarkMode={isDarkMode}
          isToday={today.getTime() === day.getTime()}
          key={`${day.getDate()}-key?`}
        >
          <Typography style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
            {formattedDate}
          </Typography>
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

  return <CellsContainer>{rows}</CellsContainer>;
}
