import { LANGUAGE, COUNTRY } from "../interfaces";

export const getCountryByLanguage = (language: LANGUAGE): COUNTRY | null => {
  if (language === LANGUAGE.RO_RO) {
    return COUNTRY.RO;
  }

  if (language === LANGUAGE.EN_US) {
    return COUNTRY.GB;
  }

  return null;
};
