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
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Cells from './cells';
import Days from './days';
import { useUser } from '../../context/userContext';

interface ICalendarProps {
  isDarkMode: boolean
}

export default function Calendar({ isDarkMode } : ICalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [user, setUser] = useState<IUser | undefined>();
  const [isTodayChecked, setIsTodayChecked] = useState<boolean>(false);
  const today = startOfDay(new Date());
  const yearMonth = `${getYear(currentMonth)}${getMonth(currentMonth)}`;
  const [totalDays, setTotalDays] = useState<number>(0);
  const { user, setUser } = useUser();
  useEffect(() => {
    if (user?.checkedDays) {
      const reducedCheckedDays:number = Object.keys(user.checkedDays)
        .reduce((prev: any, curr: any) => {
          if (user.checkedDays && user?.checkedDays[curr]) {
            return prev + user.checkedDays[curr].length;
          }
          return prev;
        }, 0);
      setTotalDays(reducedCheckedDays);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !user.checkedDays) return;
    const todayAsNumber = today.getTime();
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(todayAsNumber)) {
      setIsTodayChecked(true);
    }
  }, []);

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
    if (!user || !user.checkedDays) return;
    console.log(yearMonth, day);
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(day)) {
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [yearMonth]: checkedDays.filter((d:number) => d !== day),
        },
      });
    } else {
      setUser({
        ...user,
        checkedDays: { ...user.checkedDays, [yearMonth]: [...checkedDays, day] },
      });
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const headerDateFormat = 'MMMM yyyy';
  return (
    <Paper elevation={6} sx={{ p: 8, m: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Box>
          <Button onClick={prevMonth}>
            <ChevronLeftIcon />
          </Button>
        </Box>
        <Box>
          <Typography variant="h4">
            {format(currentMonth, headerDateFormat)}
          </Typography>
        </Box>
        <Box>
          <Button onClick={nextMonth}>
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
            variant="outlined"
            onClick={handleToggleToday}
          >
            {isTodayChecked ? 'not Completed..' : 'Complete!'}
          </Button>
        </Typography>
        <Typography>
          {`you've been at it for ${totalDays} day${totalDays !== 1 ? 's' : ''}!`}
        </Typography>
        {user.currentStreak > 2 && (
        <Typography>
          You&apos;re streaking baby!
          {user.currentStreak}
          <WhatshotIcon />
        </Typography>
        )}
        <Typography>
          Longest Streak:
          {' '}
          {user.longestStreak}
          <WhatshotIcon />
        </Typography>
      </Box>
    </Paper>
  );
}
