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
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Grow from '@mui/material/Grow';
import Cell from './cell';
import { transientConfig } from '../styledComponentTests';

interface ICellsProps {
  currentMonth: Date
  today: number
  isDarkMode: boolean
  checkedDays: number[]
  handleCellClick: (day: number) => void
}

interface IResizableIcon {
  $color: string
}

const CellsContainer = styled(Box)`
`;

export const ResizableIcon = styled(SpaOutlinedIcon, transientConfig)`
  font-size: 20px;
  color: ${({ $color }: IResizableIcon) => $color};
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
        m={0.3}
        primary={primary.main}
        secondary={secondary.main}
        isChecked={checkedDays.includes(day)}
        isDarkMode={isDarkMode}
        isToday={today === day}
        key={`col-${index % 7}-${day}`}
        onClick={() => handleCellClick(day)}
        contrastText={primary.contrastText}
      >
        {checkedDays.includes(day) && (
        <Grow
          in
          timeout={1000}
        >
          <ResizableIcon
            $color={secondary.main}
            fontSize="large"
          />
        </Grow>
        )}
        <Typography style={{ position: 'absolute', top: '0.5rem', right: '0.75rem' }}>
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
