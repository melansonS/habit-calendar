import React, { useEffect, useState } from 'react';
import {
  format, addMonths, subMonths,
  startOfDay,
  getMonth,
  getYear,
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import Cells from './cells';
import Days from './days';

interface ICalendarProps {
  isDarkMode: boolean
}
interface IUser {
  name: string
  checkedDays: {[name: string]: number[]}
}

export default function Calendar({ isDarkMode } : ICalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [user, setUser] = useState<IUser | null>(null);
  const [isTodayChecked, setIsTodayChecked] = useState<boolean>(false);
  const today = startOfDay(new Date());
  const yearMonth = `${getYear(currentMonth)}${getMonth(currentMonth)}`;

  useEffect(() => {
    if (!user) return;
    const todayAsNumber = today.getTime();
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(todayAsNumber)) {
      setIsTodayChecked(true);
    }
  }, []);

  useEffect(() => {
    const mockUser: IUser = {
      name: 'tom',
      checkedDays: {
        202111: [1639198800000],
        20221: [1643778000000, 1643864400000],
      },
    };
    setUser(mockUser);
  }, []);

  const handleToggleToday = () => {
    if (!user) return;
    const todayAsNumber = today.getTime();
    const checkedDays = user?.checkedDays[yearMonth];
    if (checkedDays?.includes(todayAsNumber)) {
      setUser({
        ...user,
        checkedDays: {
          ...user.checkedDays,
          [yearMonth]: checkedDays.filter((d:number) => d !== todayAsNumber),
        },
      });
      setIsTodayChecked(false);
    } else {
      setUser({
        ...user,
        checkedDays: { ...user.checkedDays, [yearMonth]: [...checkedDays, todayAsNumber] },
      });
      setIsTodayChecked(true);
    }
  };

  const handleCellClick = (day: number) => {
    if (!user) return;
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
    <Paper elevation={6} sx={{ p: 2, m: 2 }}>
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
        checkedDays={user?.checkedDays[yearMonth] || []}
        currentMonth={currentMonth}
        today={today}
        isDarkMode={isDarkMode}
        handleCellClick={handleCellClick}
      />
      <Box pt={2}>
        <Typography align="center" variant="h6">
          Mark today as
          {' '}
          <Button variant="outlined" onClick={handleToggleToday}>{isTodayChecked ? 'not Completed..' : 'Complete!'}</Button>
        </Typography>
      </Box>
    </Paper>
  );
}
