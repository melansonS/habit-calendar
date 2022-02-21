import { startOfDay, subDays } from 'date-fns';
import { ThemeNamesEnum } from '../utils/colorTypes';
import { IUser } from './userContext';

const mockUserData:IUser = {
  name: 'Mr.Mock',
  checkedDays: {
    20220: [
      1641963600000,
      1642050000000,
    ],
    20221: [
      1644728400000,
      1644814800000,
      1644901200000,
      1644987600000,
    ],
  },
  isStreaking: false,
  currentStreak: 2,
  longestStreak: 2,
  totalDays: 0,
  theme: {
    colorBlendPercent: 0.14,
    customTheme: null,
    isDarkMode: true,
    themeName: 'INDIGO' as ThemeNamesEnum,
  },
};

const today = startOfDay(new Date()).getTime();
const yesterday = subDays(today, 1).getTime();

if (mockUserData?.checkedDays && !mockUserData.checkedDays['20221'].includes(yesterday)) {
  console.log('am not streaking');
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
  let i = yesterday;
  while (allCheckedDays.includes(i)) {
    currentStreak += 1;
    i = subDays(i, 1).getTime();
  }
}

console.log({ allCheckedDays }, 'current streak:', currentStreak);
mockUserData.totalDays = allCheckedDays?.length || 0;
mockUserData.currentStreak = currentStreak;
