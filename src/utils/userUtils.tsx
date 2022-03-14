import { IUser } from '../context/userContext';
import formatDateString from './formatDateString';

export const unCheckToday = (
  user:IUser,
  currentYearMonth:string,
  checkedDaysInCurrentMonth:string[],
  today:string,
  yesterdayAsNumber: number,
):IUser => {
  const filteredUser:IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: checkedDaysInCurrentMonth.filter((d: string) => d !== today),
    },
    currentStreak: user.currentStreak ? user.currentStreak - 1 : 0,
    longestStreak: checkedDaysInCurrentMonth
      .includes(formatDateString(yesterdayAsNumber)) ? user.longestStreak - 1 : user.longestStreak,
    totalDays: user.totalDays - 1,
  };
  return filteredUser;
};

export const checkToday = (
  user:IUser,
  currentYearMonth:string,
  checkedDaysInCurrentMonth:string[],
  today: string,
):IUser => {
  const updatedUser:IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: [...checkedDaysInCurrentMonth, today],
    },
    currentStreak: user.currentStreak + 1,
    longestStreak: user.longestStreak < user.currentStreak + 1 ? user.currentStreak + 1 : user.longestStreak,
    totalDays: user.totalDays + 1,
  };
  return updatedUser;
};

export const newMonth = (user:IUser, currentYearMonth: string, today: string):IUser => {
  const updatedUSer: IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: [today],
    },
    currentStreak: user.currentStreak + 1,
    longestStreak: user.longestStreak < user.currentStreak + 1 ? user.currentStreak + 1 : user.longestStreak,
    totalDays: user.totalDays + 1,
  };
  return updatedUSer;
};
