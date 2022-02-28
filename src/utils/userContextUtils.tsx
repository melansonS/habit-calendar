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
  alert?: IAlert
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
    return {
      success: false,
      user: null,
      alert: {
        type: 'error',
        message: 'Unable to reach server, please try again later...',
        id: `server-error${now()}`,
      },
    } as IFetchResponse;
  }
};

export async function fetchUserData(accessToken:string) {
  try {
    const res = await fetch(`${URL}/user`, {
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
        message: 'Unable to get data from the server, using temp Mock Data!',
        id: `error${now()}`,
      },
    };
    return response;
  }
}
