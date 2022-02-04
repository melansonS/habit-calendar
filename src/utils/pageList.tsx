interface IPage {
  name: string
  location: string
}

const pageList: IPage[] = [
  { name: 'Home', location: '' },
  { name: 'Profile', location: 'profile' },
  { name: 'Calendar', location: 'calendar' },
  { name: 'Theme', location: 'theme' },
];

export default pageList;
