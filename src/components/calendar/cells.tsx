import React from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  endOfMonth, startOfMonth, eachDayOfInterval, getMonth,
} from 'date-fns';
import {
  styled, Box, Typography,
  useTheme as useMUITheme,
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

interface ICellsProps {
  currentMonth: Date
  today: Date
  isDarkMode: boolean
  checkedDays: number[]
  handleCellClick: (day: number) => void
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

const Cell = styled(Box)`
  height: 5rem;
  position: relative;
  background-color: ${({ isChecked, primary }:ICellProps) => (isChecked ? primary : 'inherit')};
  opacity: ${({ isChecked }:ICellProps) => (isChecked ? '0.5' : 'inherit')};
  border: ${({ isToday, secondary } :ICellProps) => (isToday ? `2px solid ${secondary}` : 'none')};
  :hover {
    background-color: ${({ isDarkMode }:ICellProps) => (isDarkMode ? '#333' : '#eee')};
  }
`;

export default function Cells({
  currentMonth, today, isDarkMode,
  checkedDays,
  handleCellClick,
}: ICellsProps) {
  const { palette: { primary, secondary, grey } } = useMUITheme();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const currentMonthIndex = currentMonth.getMonth();

  // TODO: memoize the array of Cell Nodes?
  const allDatesOfMonth = eachDayOfInterval({ start: startDate, end: endDate });
  const allDayTimesOfMonth = allDatesOfMonth.map((date) => date.getTime());
  const dayCells = allDayTimesOfMonth.map((day, index) => {
    const dateFormat = 'd';
    const formattedDate = format(day, dateFormat);

    if (currentMonthIndex !== getMonth(day)) {
      return (
        <Box
          style={{
            height: '5rem',
            position: 'relative',
            backgroundColor: grey[200],
          }}
          key={`col-${index % 7}-${day}-out-of-month`}
        >
          <Typography style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
            {formattedDate}
          </Typography>
        </Box>
      );
    }
    return (
      <Cell
        primary={primary.main}
        secondary={secondary.main}
        isChecked={checkedDays.includes(day)}
        isDarkMode={isDarkMode}
        isToday={today.getTime() === day}
        key={`col-${index % 7}-${day}`}
        onClick={() => handleCellClick(day)}
      >
        {checkedDays.includes(day) && (
        <CheckCircleOutlinedIcon
          color="secondary"
          fontSize="large"
        />
        )}
        <Typography style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          {formattedDate}
        </Typography>
      </Cell>
    );
  });

  return (
    <CellsContainer>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
      >
        {dayCells}

      </Box>
    </CellsContainer>
  );
}
