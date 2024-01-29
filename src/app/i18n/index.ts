import type { Locale } from "./settings";
import { Dictionary } from "../../types/app";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const currentLocale = dictionaries[locale] ? locale : "en";
  const dic = await dictionaries[currentLocale]();
  return dic as Dictionary;
};
