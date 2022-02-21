import { IUser } from '../context/userContext';
import { URL } from './consts';

const postUpdatedUser = async (user: IUser, accessToken: string) => {
  const res = await fetch(`${URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  });
  const json = await res.json();
  console.log('in post updated user', json);
};

export default postUpdatedUser;
