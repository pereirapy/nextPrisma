export type Params = { params: { id: string } };

export type SignIn = {
  email: string;
  password: string;

}


export type CreateUser = SignIn & {
  name: string;

}

export type User = CreateUser & {
  id: string;
  addressId: number;
  coachId: number;
};

export type UserDataSession = Omit<User, 'password'>;
