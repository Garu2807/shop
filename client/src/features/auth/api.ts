import { User, UserAuthLog, UserAuthReg } from '../user/types/user';

export const registrationFetch = async (value: UserAuthReg): Promise<User> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};

export const authorizationFetch = async (value: UserAuthLog): Promise<User> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  return res.json();
};

export const authCheckUserFetch = async (): Promise<User> => {
  const res = await fetch('/api/auth/check');
  console.log(res);
  return res.json();
};

export const logOutFetch = async (): Promise<void> => {
  await fetch('/api/auth/logout');
};
