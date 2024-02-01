import { NextResponse } from 'next/server';

import { hasSession } from '@/lib/auth';
import { messageError } from '@/lib/auth/check-user-can-access';
import { createRanking, getRankings } from '@/lib/services/ranking';

export async function GET() {
  try {
    const { rankings, error } = await getRankings();
    if (error) return messageError(error);
    return NextResponse.json(rankings);
  } catch (error) {
    return messageError(error);
  }
}

export async function POST(req: Request) {
  try {
    await hasSession();
    const body = await req.json();
    const { ranking, error } = await createRanking(body);
    if (error) return messageError(error);

    return NextResponse.json(ranking);
  } catch (error) {
    return messageError(error);
  }
}
