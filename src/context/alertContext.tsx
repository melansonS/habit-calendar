import { AlertColor } from '@mui/material';
import React, {
  createContext, useEffect, useMemo, useRef, useState,
} from 'react';

export interface IAlert {
    type: AlertColor
    message: string
    id: string
}

interface IAlertContext {
    alerts: IAlert[]
    addAlert: (alert: IAlert) => void
    dismissAlert: (idString: string) => void
}

export const AlertContext = createContext<IAlertContext>({
  alerts: [],
  addAlert: () => {},
  dismissAlert: () => {},
});

export function AlertContextProvider({ children }: {children: React.ReactNode}) {
  const [alerts, setAlerts] = useState<IAlert[]>([
    { type: 'info', message: 'Test', id: `test${0}` },
    { type: 'error', message: 'Error', id: `error${0}` },
  ]);

  const alertsRef = useRef(alerts);
  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);

  const AlertContextValue: IAlertContext = useMemo(() => ({
    alerts,
    addAlert: (alert: IAlert) => { setAlerts([...alertsRef.current, alert]); },
    dismissAlert: (idString:string) => {
      setAlerts(alertsRef.current.filter((alert) => `${alert.message}${alert.id}` !== idString));
    },
  }), [alerts]);

  return (
    <AlertContext.Provider value={AlertContextValue}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => React.useContext(AlertContext);
