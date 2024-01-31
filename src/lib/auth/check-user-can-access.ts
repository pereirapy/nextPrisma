import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

const getCurrentPath = (req: Request) => {
  if (!req) return { pageToVerify: '' };
  const headersList = req?.headers;
  if (!headersList) return { pageToVerify: '' };
  const headerCurrentPath = headersList.get('x-invoke-path');
  if (!headerCurrentPath) return { pageToVerify: '' };

  const currentPath = headerCurrentPath?.startsWith('/')
    ? headerCurrentPath.substring(1)
    : headerCurrentPath;

  const currentPageInfo =
    currentPath !== null ? currentPath.split('/') : ['', ''];

  const [, pageToVerify] = currentPageInfo;

  return { pageToVerify };
};

type CheckUserCanAccessResult =
  | {
      res: false;
      errorMessageKey: string;
      session?: undefined;
    }
  | {
      res: true;
      errorMessageKey?: undefined;
      session: Session;
    };

export const messageError = (error?: string | unknown) =>
  NextResponse.json(String(error || 'no_enough_privileges'), { status: 500 });
