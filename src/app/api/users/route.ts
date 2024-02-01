import { NextResponse } from 'next/server';

import { hasSession } from '@/lib/auth';
import { messageError } from '@/lib/auth/check-user-can-access';
import { getUsers, signUp } from '@/lib/services/users';

export async function GET(req: Request) {
  try {
    const { users, error } = await getUsers();
    if (error) return messageError(error);
    return NextResponse.json(users);
  } catch (error) {
    return messageError(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await hasSession();

    const body = await req.json();
    const { user, error } = await signUp({ ...body });
    if (error) return messageError(error);

    return NextResponse.json(user);
  } catch (error) {
    return messageError(error);
  }
}
