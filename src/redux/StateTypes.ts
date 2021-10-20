// Types used in redux
export type UserType = {
  userId: string;
};
export interface UserState {
  posts: UserType;
}

export const USER_ID = 'USER_ID';
