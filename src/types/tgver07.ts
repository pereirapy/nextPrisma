import { Locale } from '@/app/i18n/settings';
import { ParamsApp } from './app';

interface IParams extends ParamsApp {
	params: { lng: Locale; code: string };
}

export type Params = IParams

