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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isTodayChecked, setIsTodayChecked] = useState<boolean>(false);
  const today = startOfDay(new Date());
  const yearMonth = `${getYear(currentMonth)}${getMonth(currentMonth)}`;
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
    const checkedDays = user?.checkedDays[currentYearMonth];
    if (!checkedDays) {
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
    if (checkedDays?.includes(todayAsNumber)) {
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [currentYearMonth]: checkedDays.filter((d:number) => d !== todayAsNumber),
        },
        currentStreak: user.currentStreak ? user.currentStreak - 1 : 0,
        longestStreak: checkedDays.includes(yesterdayAsNumber) ? user.longestStreak - 1 : user.longestStreak,
      });
      setIsTodayChecked(false);
    } else {
      playAudio();
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [currentYearMonth]: [...checkedDays, todayAsNumber],
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

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
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
            {format(currentMonth, headerDateFormat)}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={nextMonth}>
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Days currentMonth={currentMonth} isDarkMode={isDarkMode} />
      <Cells
        checkedDays={user?.checkedDays && user.checkedDays[yearMonth] ? user.checkedDays[yearMonth] : []}
        currentMonth={currentMonth}
        today={today}
        isDarkMode={isDarkMode}
        handleCellClick={handleCellClick}
      />
      <Box pt={2}>
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
