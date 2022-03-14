import { useAuth0 } from '@auth0/auth0-react';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';
import { fetchUserData, postUpdatedUser } from '../utils/userContextUtils';
import { useAlert } from './alertContext';

interface IUserTheme {
  colorBlendPercent: number,
  customTheme: Partial<ITheme> | null,
  isDarkMode: boolean,
  themeName: ThemeNamesEnum,
}

export interface IUser {
    name: string
    checkedDays: {[name: string]: string[]} | null,
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
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const { addAlert } = useAlert();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userValue, setUserValue] = useState<IUser | null>(null);

  const fetchAccessToken = async () => {
    const fetchedToken = await getAccessTokenSilently({
      audience: 'hcAuth',
      scope: 'read:current_user',
    });
    if (fetchedToken) {
      setAccessToken(fetchedToken);
    }
    return fetchedToken;
  };

  useEffect(() => {
    const getUserData = async () => {
      if (isAuthenticated) {
        setIsUserLoading(true);
        if (!accessToken) {
          await fetchAccessToken();
        } else {
          const response = await fetchUserData(accessToken);
          if (response.alert) {
            addAlert(response.alert);
          }
          if (!response.success) logout();
          setUserValue(response.user);
          setIsUserLoading(false);
        }
      }
    };
    getUserData();
  }, [isAuthenticated, accessToken]);

  const userContextValue:IUserContext = useMemo(() => ({
    user: userValue,
    isUserLoading,
    setUser: async (user: React.SetStateAction<IUser | null>) => {
      if (user && accessToken) {
        const response = await postUpdatedUser(user as IUser, accessToken);
        if (response.alert) addAlert(response.alert);
        if (response.success) {
          setUserValue(user);
        }
      }
    },
  }), [userValue, isUserLoading, accessToken]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
