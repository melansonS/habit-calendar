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
  timezoneOffset: number
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
  currentMonth,
  today,
  isDarkMode,
  checkedDays,
  handleCellClick,
  timezoneOffset,
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
          sx={{
            height: { xs: '3rem', sm: '5rem' },
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
        isChecked={checkedDays.includes(day - (timezoneOffset * 60 * 1000))}
        isDarkMode={isDarkMode}
        isToday={today + (timezoneOffset * 60 * 1000) === day}
        key={`col-${index % 7}-${day}`}
        onClick={() => handleCellClick(day)}
        contrastText={primary.contrastText}
        sx={{ height: { xs: '3rem', sm: '5rem' } }}
      >
        {checkedDays.includes(day - (timezoneOffset * 60 * 1000)) && (
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
        <Typography
          sx={{
            top: { xs: '0px', sm: '0.3rem' },
            right: { xs: '3px', sm: '0.65rem' },
            fontSize: { xs: '.75rem', sm: 'inherit' },
            position: 'absolute',
          }}
        >
          {formattedDate}
        </Typography>
      </Cell>
    );
  });

  return (
    <CellsContainer pb={2}>
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
