import { NextResponse } from 'next/server';

import { messageError } from '@/lib/auth/check-user-can-access';
import { signUp } from '@/lib/services/users';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, error } = await signUp(body);
    if (error) return messageError(error);

    return NextResponse.json(user);
  } catch (error) {
    return messageError(error);
  }
}
