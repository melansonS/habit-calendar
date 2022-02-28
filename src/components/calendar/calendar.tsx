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
// import audio from '../../audio/mixkit-single-key-press-in-a-laptop-2541.wav';
// import audio from '../../audio/mixkit-slide-click-1130.wav';
// import audio from '../../audio/mixkit-plastic-bubble-click-1124.wav';

interface ICalendarProps {
  isDarkMode: boolean
}

export default function Calendar({ isDarkMode } : ICalendarProps) {
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date());
  const [isTodayChecked, setIsTodayChecked] = useState<boolean>(false);
  const today = startOfDay(new Date());
  const yearMonth = `${getYear(currentDisplayMonth)}${getMonth(currentDisplayMonth)}`;
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user || !user.checkedDays) return;
    const todayAsNumber = today.getTime();
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(todayAsNumber)) {
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
    const todayAsNumber = today.getTime();
    const yesterdayAsNumber = subDays(today, 1).getTime();

    const currentYearMonth = `${getYear(today)}${getMonth(today)}`;
    const checkedDaysInCurrentMonth = user?.checkedDays[currentYearMonth];
    if (!checkedDaysInCurrentMonth) {
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [currentYearMonth]: [todayAsNumber],
        },
        currentStreak: 1,
        longestStreak: user.longestStreak < 1 ? 1 : user.longestStreak,
      });
      return;
    }
    if (checkedDaysInCurrentMonth?.includes(todayAsNumber)) {
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [currentYearMonth]: checkedDaysInCurrentMonth.filter((d:number) => d !== todayAsNumber),
        },
        currentStreak: user.currentStreak ? user.currentStreak - 1 : 0,
        longestStreak: checkedDaysInCurrentMonth
          .includes(yesterdayAsNumber) ? user.longestStreak - 1 : user.longestStreak,
      });
      setIsTodayChecked(false);
    } else {
      playAudio();
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [currentYearMonth]: [...checkedDaysInCurrentMonth, todayAsNumber],
        },
        currentStreak: user.currentStreak ? user.currentStreak + 1 : 1,
        longestStreak: user.longestStreak < user.currentStreak + 1 ? user.currentStreak + 1 : user.longestStreak,

      });
      setIsTodayChecked(true);
    }
  };

  const handleCellClick = (day: number) => {
    console.log(yearMonth, day);
  };

  const handleJumpToCurrentMonth = () => {
    setCurrentDisplayMonth(today);
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
    <Paper elevation={6} sx={{ p: 8, m: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Box>
          <Button variant="contained" onClick={prevMonth}>
            <ChevronLeftIcon />
          </Button>
        </Box>
        <Box>
          <Typography variant="h4">
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
      {today.getMonth() === currentDisplayMonth.getMonth()
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
      <Box pt={2}>
        <Typography>
          {`you've been at it for ${user.totalDays} day${user.totalDays !== 1 ? 's' : ''}!`}
        </Typography>
        {user.currentStreak > 2 && (
        <Typography>
          You&apos;re streaking baby!
          {user.currentStreak}
          <LocalFireDepartmentIcon />
        </Typography>
        )}
        <Typography>
          Longest Streak:
          {' '}
          {user.longestStreak}
          <LocalFireDepartmentIcon />
        </Typography>
      </Box>
    </Paper>
  );
}
