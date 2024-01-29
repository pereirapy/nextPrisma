import * as React from "react";
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation_es from "zod-i18n-map/locales/es/zod.json";
import translation_pt from "zod-i18n-map/locales/pt/zod.json";
import { Locale } from "@/app/i18n/settings";

export function useZodLocalized(currentLanguage: Locale) {
  React.useEffect(() => {
    i18next.init({
      lng: currentLanguage,
      resources: {
        pt: { zod: translation_pt },
        es: { zod: translation_es },
      },
    });
    z.setErrorMap(zodI18nMap);
  }, [currentLanguage]);
}
