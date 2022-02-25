import { useAuth0 } from '@auth0/auth0-react';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';
import { URL } from '../utils/consts';
import postUpdatedUser from '../utils/userContextUtils';
import { useAlert } from './alertContext';
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
  const { addAlert } = useAlert();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userValue, setUserValue] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (isAuthenticated) {
        setIsUserLoading(true);
        const fetchedToken = await getAccessTokenSilently({
          audience: 'hcAuth',
          scope: 'read:current_user',
        });
        if (!fetchedToken) return false;
        try {
          setAccessToken(fetchedToken);
          const res = await fetch(`${URL}/user`, {
            headers: {
              Authorization: `Bearer ${fetchedToken}`,
            },
          });
          if (!res) return false;
          const json = await res.json();
          setUserValue(json.userData);
          setIsUserLoading(false);
          return true;
        } catch (err) {
          console.log('usercontext fetch user data error:', err);
          console.warn('Unable to get data from the server, using temp Mock Data!');
          addAlert({
            type: 'error',
            message: 'Unable to get data from the server, using temp Mock Data!',
            id: `error${new Date().getTime()}`,
          });
          setUserValue(mockUserData);
          setIsUserLoading(false);
        }
      }
      return false;
    };
    getUserData();
  }, [isAuthenticated, isLoading]);

  const userContextValue:IUserContext = useMemo(() => ({
    user: userValue,
    setUser: async (user: React.SetStateAction<IUser | null>) => {
      if (user && accessToken) {
        const response = await postUpdatedUser(user as IUser, accessToken);
        if (!response.success) {
          addAlert({
            type: 'error',
            message: 'Unable to reach server for update',
            id: `Error - ${new Date().getTime()}`,
          });
        } else {
          addAlert({
            type: 'success',
            message: 'Congratulations!',
            id: `Success - ${new Date().getTime()}`,
          });
        }
      }
      setUserValue(user);
    },
    isUserLoading,
  }), [userValue, isUserLoading, accessToken]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
