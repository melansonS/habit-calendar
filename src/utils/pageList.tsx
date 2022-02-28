interface IPage {
  name: string
  location: string
}

const pageList: IPage[] = [
  { name: 'Profile', location: 'profile' },
  { name: 'Calendar', location: 'calendar' },
  { name: 'Theme', location: 'theme' },
];

export default pageList;
