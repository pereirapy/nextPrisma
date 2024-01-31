import { Dictionary } from "@/types/app";
import type { Locale } from "./settings";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const currentLocale = dictionaries[locale] ? locale : "en";
  const dic = await dictionaries[currentLocale]();
  return dic as Dictionary;
};
