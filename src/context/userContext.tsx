import { useAuth0 } from '@auth0/auth0-react';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';
import mockUserData from './userMockData';

interface IUserTheme {
  colorBlendPercent: number,
  customTheme: Partial<ITheme> | null,
  isDarkMode: boolean,
  themeName: ThemeNamesEnum,
}

export interface IUser {
    name: string
    checkedDays: {[name: string]: number[]} | null,
    isStreaking: boolean,
    currentStreak: number,
    longestStreak: number,
    totalDays: number,
    theme: IUserTheme
}

interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isUserLoading: boolean;
}

export const UserContext = createContext<IUserContext>({
  user: {
    name: '',
    checkedDays: null,
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
  },
  setUser: () => {},
  isUserLoading: true,

});

export function UserContextProvider({ children } : {children: React.ReactNode}) {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const [userValue, setUserValue] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (isAuthenticated) {
        setIsUserLoading(true);
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
          setIsUserLoading(false);
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
  }, [isAuthenticated, isLoading]);

  const userContextValue:IUserContext = useMemo(() => ({
    user: userValue,
    setUser: (user: React.SetStateAction<IUser | null>) => setUserValue(user),
    isUserLoading,
  }), [userValue, isUserLoading]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
