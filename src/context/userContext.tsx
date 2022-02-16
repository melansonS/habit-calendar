import { useAuth0 } from '@auth0/auth0-react';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import mockUserData from './userMockData';

export interface IUser {
    name: string
    checkedDays: {[name: string]: number[]} | null
  }

interface IUserContext {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = createContext<IUserContext>({
  user: {
    name: '',
    checkedDays: null,
  },
  setUser: () => {},

});

export function UserContextProvider({ children } : {children: React.ReactNode}) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userValue, setUserValue] = useState<IUser>({ name: '', checkedDays: null });

  useEffect(() => {
    const getUserData = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          audience: 'hcAuth',
          scope: 'read:current_user',
        });
        if (!accessToken) return false;
        try {
          const res = await fetch('http://localhost:8080/private', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!res) return false;
          const json = await res.json();
          setUserValue(json.secrets[0].userData);
          return true;
        } catch (err) {
          console.log('usercontext fetch user data error:', err);
          console.warn('Unable to get data from the server, using temp Mock Data!');
          setUserValue(mockUserData);
        }
      }
      return false;
    };
    getUserData();
  }, [isAuthenticated]);

  const userContextValue:IUserContext = useMemo(() => ({
    user: userValue,
    setUser: (user: React.SetStateAction<IUser>) => setUserValue(user),
  }), [userValue]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
