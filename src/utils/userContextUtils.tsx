import { IAlert } from '../context/alertContext';
import { IUser } from '../context/userContext';
import mockUserData from '../context/userMockData';
import { URL } from './consts';
import now from './useNow';

interface IAPIResponse {
  success: boolean
  user: IUser | null
}

interface IFetchResponse extends IAPIResponse {
  alert: IAlert
}

export const postUpdatedUser = async (user: IUser, accessToken: string) => {
  try {
    const res = await fetch(`${URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });
    const json:IAPIResponse = await res.json();
    console.log('in post updated user', json);
    const response:IFetchResponse = {
      ...json,
      alert: {
        type: json.success ? 'success' : 'error',
        message: json.success ? 'Successfully updated!' : 'Failed to update...',
        id: `post-user-${now()}`,
      },
    };
    return response;
  } catch (err) {
    const response:IFetchResponse = {
      success: false,
      user: null,
      alert: {
        type: 'error',
        message: 'Unable to reach server, please try again later...',
        id: `server-error${now()}`,
      },
    };
    return response;
  }
};

export async function fetchUserData(accessToken:string) {
  const today = Date().slice(0, 15);
  try {
    const res = await fetch(`${URL}/user/${today}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    const response: IFetchResponse = {
      ...json,
      alert: {
        type: 'success',
        message: 'User data retrieved from server',
        id: `fetch-user-${now()}`,
      },
    };
    return response;
  } catch (err) {
    console.log('usercontext fetch user data error:', err);
    const response:IFetchResponse = {
      success: false,
      user: mockUserData,
      alert: {
        type: 'error',
        message: 'Unable to get data from the server, logging out',
        id: `error${now()}`,
      },
    };
    return response;
  }
}

export const pingServer = async ():Promise<IFetchResponse> => {
  try {
    const res = await fetch(`${URL}/ping`);
    const json = await res.json();
    return json;
  } catch (err) {
    const response:IFetchResponse = {
      success: false,
      user: null,
      alert: {
        type: 'error',
        message: 'Unable to reach server, please try again later...',
        id: `server-error${now()}`,
      },
    };
    return response;
  }
};
