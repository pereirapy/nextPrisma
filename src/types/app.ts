import { Locale } from "@/app/i18n/settings";
import en from "../app/i18n/dictionaries/en.json";
import pt from "../app/i18n/dictionaries/pt.json";

export type ParamsApp = {
	params: { lng: Locale };
};

export type OurFetchParams = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: any;
};


export type Dictionaries = {
  en: typeof en;
  pt: typeof pt;
};

export type Dictionary = Dictionaries[Locale];
