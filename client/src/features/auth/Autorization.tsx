import { User } from "../user/types/user";

export type AuthState = {
  user: User | undefined;
  error: string | undefined
  pending: boolean
};
