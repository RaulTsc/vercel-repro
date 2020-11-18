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

export const getLanguageByPathname = (pathname: string): LANGUAGE | null => {
  console.log("pathname", pathname);

  if (pathname.includes("/ro")) {
    return LANGUAGE.RO_RO;
  }

  return LANGUAGE.EN_US;
};
