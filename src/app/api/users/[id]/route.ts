import { NextResponse } from 'next/server';

import { Params } from '@/types/user';
import { hasSession } from '@/lib/auth';
import { messageError } from '@/lib/auth/check-user-can-access';
import { deleteUserById, getUser, updateUserById } from '@/lib/services/users';

export async function GET(_: Request, { params }: Params) {
  try {
    const id = params.id;
    const { user, error } = await getUser(id);

    if (error) return messageError(error);
    return NextResponse.json(user);
  } catch (error) {
    return messageError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await hasSession();

    const id = params.id;
    const body = await req.json();
    const { user, error } = await updateUserById(body, id);

    if (error) return messageError(error);

    return NextResponse.json(user);
  } catch (error) {
    return messageError(error);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await hasSession();

    const id = params.id;
    const { user, error } = await deleteUserById(id);
    if (error) return messageError(error);
    return NextResponse.json(user);
  } catch (error) {
    return messageError(error);
  }
}
