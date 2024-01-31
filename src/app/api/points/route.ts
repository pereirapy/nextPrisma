import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { messageError } from '@/lib/auth/check-user-can-access';
import { createPoint, getPointsByCoach } from '@/lib/services/points';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const { points, error } = await getPointsByCoach(session?.user.coachId);
    if (error) return messageError(error);
    return NextResponse.json(points);
  } catch (error) {
    return messageError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { point, error } = await createPoint(body);
    if (error) return messageError(error);

    return NextResponse.json(point);
  } catch (error) {
    return messageError(error);
  }
}
