import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { messageError } from '@/lib/auth/check-user-can-access';
import { createVersion, getVersions } from '@/lib/services/versions';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { versions, error } = await getVersions();
    if (error) return messageError(error);
    return NextResponse.json(versions);
  } catch (error) {
    return messageError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { version, error } = await createVersion(body);
    if (error) return messageError(error);

    return NextResponse.json(version);
  } catch (error) {
    return messageError(error);
  }
}
