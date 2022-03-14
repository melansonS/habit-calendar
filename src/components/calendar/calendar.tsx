import React, { useEffect, useState } from 'react';
import {
  format, addMonths, subMonths,
  startOfYesterday,
  startOfToday,
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
  const today = Date().slice(0, 15);
  const todayTimeStamp = startOfToday().getTime();
  const yearMonthFormat = 'yyyy LLL';
  const currentYearMonthString = format(todayTimeStamp, yearMonthFormat); // month year as string
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user || !user.checkedDays) return;
    const checkedDays = user?.checkedDays[currentYearMonthString];
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

    const yesterdayAsNumber = startOfYesterday().getTime();
    const checkedDaysInCurrentMonth = user?.checkedDays[currentYearMonthString];

    if (!checkedDaysInCurrentMonth) {
      setUser(newMonth(user, currentYearMonthString, today));
      setIsTodayChecked(true);
      return;
    }
    if (checkedDaysInCurrentMonth?.includes(today)) {
      setUser(unCheckToday(user, currentYearMonthString, checkedDaysInCurrentMonth, today, yesterdayAsNumber));
      setIsTodayChecked(false);
    } else {
      playAudio();
      setUser(checkToday(user, currentYearMonthString, checkedDaysInCurrentMonth, today));
      setIsTodayChecked(true);
    }
  };

  const handleCellClick = (day: number) => {
    console.log(currentYearMonthString, 'utc adjusted timestamp', day);
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
    <Paper sx={{ p: { xs: 4, sm: 8 }, pt: { xs: 2, sm: 4 } }}>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography textAlign="center" sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
            <strong>
              {format(currentDisplayMonth, headerDateFormat)}
            </strong>
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}
        >
          <Button variant="contained" onClick={prevMonth}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="contained" onClick={nextMonth}>
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Days currentMonth={currentDisplayMonth} />
      <Cells
        checkedDays={user?.checkedDays && user.checkedDays[currentYearMonthString]
          ? user.checkedDays[currentYearMonthString] : []}
        currentMonth={currentDisplayMonth}
        today={today}
        isDarkMode={isDarkMode}
        handleCellClick={handleCellClick}
      />
      {new Date(today).getMonth() === currentDisplayMonth.getMonth()
      && new Date(today).getFullYear() === currentDisplayMonth.getFullYear()
        ? (
          <Typography align="center" variant="h6">
            Mark today as
            {' '}
            <Button
              variant="contained"
              onClick={debouncedToggleToday}
            >
              {isTodayChecked ? ' Incomplete' : 'Complete!'}
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
              {format(todayTimeStamp, 'MMMM')}
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
        {user.currentStreak > 2 && (
        <Typography variant="h6" display="flex" justifyContent="center">
          {user.currentStreak}
          {' '}
          days in a row! Keep it up
          {' '}
          <LocalFireDepartmentIcon color="primary" />
        </Typography>
        )}
        <Typography variant="h6" display="flex" justifyContent="center">
          Longest Streak:
          {' '}
          {user.longestStreak}
          <LocalFireDepartmentIcon color="primary" />
        </Typography>
      </Box>
    </Paper>
  );
}
