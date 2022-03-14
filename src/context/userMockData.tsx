import { startOfDay, subDays } from 'date-fns';
import { ThemeNamesEnum } from '../utils/colorTypes';
import { IUser } from './userContext';
import formatDateString from '../utils/formatDateString';

const mockUserData:IUser = {
  name: 'Mr.Mock',
  checkedDays: {
    '2022 Mar': [
      'Tue Mar 01 2022',
      'Wed Mar 02 2022',
      'Thu Mar 03 2022',
      'Sun Mar 13 2022',
    ],
  },
  isStreaking: false,
  currentStreak: 0,
  longestStreak: 0,
  totalDays: 0,
  theme: {
    colorBlendPercent: 0.14,
    customTheme: null,
    isDarkMode: false,
    themeName: 'INDIGO' as ThemeNamesEnum,
  },
};

const todayTimeStamp = startOfDay(new Date()).getTime();
const yesterday = formatDateString(subDays(todayTimeStamp, 1));

if (mockUserData?.checkedDays && !mockUserData.checkedDays['2022 Mar'].includes(yesterday)) {
  mockUserData.currentStreak = 0;
}

mockUserData.name = 'Bingpot';

export default mockUserData;

// flatten the checked days object
// could check for only backwards sequential dayMonth values and only flatten those months
const allCheckedDays = mockUserData?.checkedDays
  && Object.values(mockUserData.checkedDays).reduce((prev, curr) => prev.concat(curr), []);

let currentStreak = 0;

if (allCheckedDays && allCheckedDays.includes(yesterday)) {
  // confirm that {yesterday - 1} is actually checked
  let i = 1;
  while (allCheckedDays.includes(new Date(subDays(todayTimeStamp, i)).toString().slice(0, 15))) {
    currentStreak += 1;
    i += 1;
  }
}

mockUserData.totalDays = allCheckedDays?.length || 0;
mockUserData.currentStreak = currentStreak;
