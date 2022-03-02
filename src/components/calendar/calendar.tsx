import React, { useEffect, useState } from 'react';
import {
  format, addMonths, subMonths,
  startOfDay,
  getMonth,
  getYear,
  subDays,
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Navigate } from 'react-router-dom';
import Cells from './cells';
import Days from './days';
import { useUser } from '../../context/userContext';

// @ts-ignore
import audio from '../../audio/mixkit-cool-interface-click-tone-2568.wav';
import { checkToday, newMonth, unCheckToday } from '../../utils/userUtils';
// import audio from '../../audio/mixkit-single-key-press-in-a-laptop-2541.wav';
// import audio from '../../audio/mixkit-slide-click-1130.wav';
// import audio from '../../audio/mixkit-plastic-bubble-click-1124.wav';

interface ICalendarProps {
  isDarkMode: boolean
}

export default function Calendar({ isDarkMode } : ICalendarProps) {
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date());
  const [isTodayChecked, setIsTodayChecked] = useState<boolean>(false);
  const today = startOfDay(new Date()).getTime();
  const yearMonth = `${getYear(currentDisplayMonth)}${getMonth(currentDisplayMonth)}`;
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user || !user.checkedDays) return;
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(today)) {
      setIsTodayChecked(true);
    }
  }, []);

  const playAudio = () => {
    const player = new Audio(audio);
    player.volume = 1;
    player.play();
  };

  const handleToggleToday = () => {
    if (!user || !user.checkedDays) return;

    const yesterdayAsNumber = subDays(today, 1).getTime();
    const currentYearMonth = `${getYear(today)}${getMonth(today)}`;
    const checkedDaysInCurrentMonth = user?.checkedDays[currentYearMonth];

    if (!checkedDaysInCurrentMonth) {
      setUser(newMonth(user, currentYearMonth, today));
      setIsTodayChecked(true);
      return;
    }
    if (checkedDaysInCurrentMonth?.includes(today)) {
      setUser(unCheckToday(user, currentYearMonth, checkedDaysInCurrentMonth, today, yesterdayAsNumber));
      setIsTodayChecked(false);
    } else {
      playAudio();
      setUser(checkToday(user, currentYearMonth, checkedDaysInCurrentMonth, today));
      setIsTodayChecked(true);
    }
  };

  const handleCellClick = (day: number) => {
    console.log(yearMonth, day);
  };

  const handleJumpToCurrentMonth = () => {
    setCurrentDisplayMonth(new Date(today));
  };

  const nextMonth = () => {
    setCurrentDisplayMonth(addMonths(currentDisplayMonth, 1));
  };

  const prevMonth = () => {
    setCurrentDisplayMonth(subMonths(currentDisplayMonth, 1));
  };

  const debouncedToggleToday = debounce(() => {
    handleToggleToday();
  }, 200);

  const headerDateFormat = 'MMMM yyyy';

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 4, sm: 8 },
      }}
    >
      <Box sx={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', pb: 4,
      }}
      >
        <Box>
          <Button variant="contained" onClick={prevMonth}>
            <ChevronLeftIcon />
          </Button>
        </Box>
        <Box>
          <Typography textAlign="center" variant="h4">
            {format(currentDisplayMonth, headerDateFormat)}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={nextMonth}>
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Days currentMonth={currentDisplayMonth} />
      <Cells
        checkedDays={user?.checkedDays && user.checkedDays[yearMonth] ? user.checkedDays[yearMonth] : []}
        currentMonth={currentDisplayMonth}
        today={today}
        isDarkMode={isDarkMode}
        handleCellClick={handleCellClick}
      />
      {new Date(today).getMonth() === currentDisplayMonth.getMonth()
        ? (
          <Typography align="center" variant="h6">
            Mark today as
            {' '}
            <Button
              variant="contained"
              onClick={debouncedToggleToday}
            >
              {isTodayChecked ? 'not Completed..' : 'Complete!'}
            </Button>
          </Typography>
        )
        : (
          <Typography align="center" variant="h6">
            Jump back to
            {' '}
            <Button
              variant="contained"
              onClick={handleJumpToCurrentMonth}
            >
              {format(today, 'MMMM')}
            </Button>
          </Typography>
        )}
      <Box pt={2} textAlign="center">
        <Typography variant="h6">
          You&apos;ve been at it for
          <Typography display="inline" color="primary" fontSize="1.1em">
            <strong>
              {' '}
              {user.totalDays}
              {' '}
            </strong>
          </Typography>
          {`day${user.totalDays !== 1 ? 's' : ''}!`}
        </Typography>
        <Typography variant="h6" display="flex" justifyContent="center">
          Longest Streak:
          {' '}
          {user.longestStreak}
          <LocalFireDepartmentIcon color="primary" />
        </Typography>
        {user.currentStreak > 2 && (
        <Typography variant="h6" display="flex" justifyContent="center">
          You&apos;re streaking baby!
          {' '}
          {user.currentStreak}
          {' '}
          in a row!
          <LocalFireDepartmentIcon color="primary" />
        </Typography>
        )}
      </Box>
    </Paper>
  );
}
