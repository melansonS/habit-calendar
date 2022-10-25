const devLogger = (a: any) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(...a);
};

export default devLogger;
