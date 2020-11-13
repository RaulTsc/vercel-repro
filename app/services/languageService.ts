import { LANGUAGE } from "../interfaces";

export const getLocaleFromLanguage = (
  language: LANGUAGE
): string | undefined => {
  if (language === LANGUAGE.EN_US) {
    return "en";
  }

  if (language === LANGUAGE.DE_DE) {
    return "de";
  }

  if (language === LANGUAGE.RO_RO) {
    return "ro";
  }
};
