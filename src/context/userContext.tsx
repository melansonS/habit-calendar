import { useAuth0 } from '@auth0/auth0-react';
import React, {
  createContext, useEffect, useState,
} from 'react';

export interface IUser {
    name: string
    checkedDays: {[name: string]: number[]} | null
  }

export const UserContext = createContext<IUser>({
  name: '',
  checkedDays: null,
});

export function UserContextProvider({ children } : {children: React.ReactNode}) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userValue, setUserValue] = useState<IUser>({ name: '', checkedDays: null });

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          audience: 'hcAuth',
          scope: 'read:current_user',
        });
        console.log({ accessToken });
        const res = await fetch('http://localhost:8080/private', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await res.json();
        setUserValue(json.secrets[0].userData);
      }
    };
    getToken();
  }, [isAuthenticated]);

  console.log('user context reder?', userValue);
  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
