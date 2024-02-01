import { NextResponse } from 'next/server';

export const messageError = (error?: string | unknown) =>
  NextResponse.json(String(error || 'no_enough_privileges'), { status: 500 });
