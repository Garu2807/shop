import { User } from './types/user';

export const loadUsersFetch = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  return res.json();
};
