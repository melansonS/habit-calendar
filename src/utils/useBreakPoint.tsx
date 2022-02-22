import { useState, useEffect } from 'react';
import { Breakpoint, useTheme as useMUITheme } from '@mui/material';

function useBreakPoints() {
  const {
    breakpoints: {
      values: {
        xl, lg, md, sm,
      },
    },
  } = useMUITheme();

  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  function handleResize() {
    const width = window.innerWidth;
    let bp:Breakpoint = 'xs';
    if (width >= xl) {
      bp = 'xl';
    } else if (width >= lg) {
      bp = 'lg';
    } else if (width >= md) {
      bp = 'md';
    } else if (width >= sm) {
      bp = 'sm';
    }
    setBreakpoint(bp);
  }

  useEffect(
    () => {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    },
    [],
  );

  return breakpoint;
}

export default useBreakPoints;
