import { NextResponse } from 'next/server';

import { Params } from '@/types/tgver07';
import { messageError } from '@/lib/auth/check-user-can-access';
import {
  deleteVersionById,
  getVersion,
  updateVersionById,
} from '@/lib/services/versions';

export async function GET(req: Request, { params }: Params) {
  try {
    const code = params.code;
    const { version, error } = await getVersion(code);

    if (error) return messageError(error);
    return NextResponse.json(version);
  } catch (error) {
    return messageError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const code = params.code;
    const body = await req.json();
    const { version, error } = await updateVersionById(body, code);

    if (error) return messageError(error);

    return NextResponse.json(version);
  } catch (error) {
    return messageError(error);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const code = params.code;
    const { version, error } = await deleteVersionById(code);
    if (error) return messageError(error);
    return NextResponse.json(version);
  } catch (error) {
    return messageError(error);
  }
}
