export type Params = { params: { id: string } };


export type User = {
  id: string;
  addressId: number;
  coachId: number;
  name: string;
  email: string;
  password: string;
};

export type UserDataSession = Omit<User, 'password'>;
