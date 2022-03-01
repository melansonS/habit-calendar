import { IUser } from '../context/userContext';

export const unCheckToday = (
  user:IUser,
  currentYearMonth:string,
  checkedDaysInCurrentMonth:number[],
  today:number,
  yesterdayAsNumber: number,
):IUser => {
  const filteredUser:IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: checkedDaysInCurrentMonth.filter((d: number) => d !== today),
    },
    currentStreak: user.currentStreak ? user.currentStreak - 1 : 0,
    longestStreak: checkedDaysInCurrentMonth.includes(yesterdayAsNumber) ? user.longestStreak - 1 : user.longestStreak,
  };
  return filteredUser;
};

export const checkToday = (
  user:IUser,
  currentYearMonth:string,
  checkedDaysInCurrentMonth:number[],
  today: number,
):IUser => {
  const updatedUser:IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: [...checkedDaysInCurrentMonth, today],
    },
    currentStreak: user.currentStreak + 1,
    longestStreak: user.longestStreak < user.currentStreak + 1 ? user.currentStreak + 1 : user.longestStreak,
  };
  return updatedUser;
};

export const newMonth = (user:IUser, currentYearMonth: string, today: number):IUser => {
  const updatedUSer: IUser = {
    ...user,
    checkedDays: {
      ...user.checkedDays,
      [currentYearMonth]: [today],
    },
    currentStreak: user.currentStreak + 1,
    longestStreak: user.longestStreak < user.currentStreak + 1 ? user.currentStreak + 1 : user.longestStreak,
  };
  return updatedUSer;
};
