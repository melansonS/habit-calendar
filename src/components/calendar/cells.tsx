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
import Grow from '@mui/material/Grow';

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
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s ease-out;
  background-color: ${({ isChecked, primary }:ICellProps) => (isChecked ? primary : 'inherit')};
  border: ${({ isToday, secondary } :ICellProps) => (isToday ? `2px solid ${secondary}` : 'none')};
  :hover {
    background-color: ${({ isDarkMode }:ICellProps) => (isDarkMode ? '#333' : '#eee')};
  }
`;

const ResizableIcon = styled(CheckCircleOutlinedIcon)`
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 30px;
    flex-direction: column;
  }
  @media (min-width: 1200px) {
    font-size: 50px;
    flex-direction: column;
  }
`;

export default function Cells({
  currentMonth, today, isDarkMode,
  checkedDays,
  handleCellClick,
}: ICellsProps) {
  const { palette: { primary, secondary } } = useMUITheme();
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
          }}
          key={`col-${index % 7}-${day}-out-of-month`}
        />
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
        <Grow
          in
          timeout={1000}
        >
          <ResizableIcon
            color="secondary"
            fontSize="large"
          />
        </Grow>
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
