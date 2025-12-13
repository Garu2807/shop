export type User = {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
};
export type userId = User['id'];

export type UserAuthReg = {
  name: string;
  email: string;
  password: string;
};

export type UserAuthLog = {
  email: string;
  password: string;
};
