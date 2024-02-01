import { taddr01 } from '@prisma/client';
import prisma from 'packages/database/prisma';

import { CreateUser, SignIn } from '@/types/user';

export const signIn = async (user: SignIn | undefined) => {
  try {
    const email = user?.email.trim();
    const password = user?.password.trim();

    if (!email || !password || password === '' || email === '')
      return { error: 'fields_can_not_be_empty' };

    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: 'email_invalid' };

    const existingUserEmail = await prisma.taddr01.findUnique({
      where: { addrtype: 'E', address: email },
    });

    if (existingUserEmail) {
      const existingUserPassword = await prisma.tcoach02.findMany({
        where: { addressId: existingUserEmail.addressId },
      });

      if (!existingUserPassword || existingUserPassword.length > 1)
        return { error: 'user_not_found!' };
      const firstUser = existingUserPassword[0];
      // Compare hash of passwords.
      if (password !== firstUser.password) return { error: 'bad_password' };

      return {
        user: {
          id: firstUser.id,
          addressId: firstUser.addressId,
          coachId: firstUser.addressId,
          name: firstUser.name,
          email: existingUserEmail.address,
        },
      };
    } else return { error: 'user_not_found!' };
  } catch (error) {
    return { error };
  }
};
export const signUp = async (user: CreateUser) => {
  try {
    const name = user?.name.trim();
    const email = user?.email.trim();
    const password = user?.password.trim();

    if (
      !name ||
      !password ||
      !email ||
      name === '' ||
      password === '' ||
      email === ''
    )
      return { error: 'fields_can_not_be_empty' };

    // Check if email is valid.
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: 'email_invalid' };

    // Check if user already exist.
    const existingUser = await prisma.taddr01.findUnique({
      where: { addrtype: 'E', address: email },
    });

    if (existingUser) return { error: 'email_invalid' };

    // Create user in DB.
    const newUser = await prisma.taddr01.create({
      data: {
        creatorName: name,
        address: email,
        addrtype: 'E',
        lang: 'EN',
      },
    });

    const tcoach02Data = await prisma.tcoach02.create({
      data: {
        addressId: newUser.addressId,
        name,
        password,
        status: 'Active',
      },
    });

    return {
      user: {
        id: tcoach02Data.id,
        coachId: tcoach02Data.addressId,
        addressId: tcoach02Data.addressId,
        name: tcoach02Data.name,
        email: newUser.address,
      },
    };
  } catch (error) {
    return { error };
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.taddr01.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await prisma.taddr01.findUnique({
      where: {
        addressId: Number(id),
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await prisma.tcoach02.deleteMany({
      where: { addressId: Number(id) },
    });
    const user = await prisma.taddr01.delete({
      where: { addressId: Number(id) },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

export const updateUserById = async (data: taddr01, id: string) => {
  try {
    const user = await prisma.taddr01.update({
      where: { addressId: Number(id) },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
};
