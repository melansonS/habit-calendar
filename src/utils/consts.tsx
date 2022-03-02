// export const URL = 'http://localhost:8080';
export const LOCAL_THEME_DATA = 'localThemeData';
export const URL = process.env.NODE_ENV === 'production'
  ? 'https://habitcalendar.herokuapp.com' : 'http://localhost:8080';
