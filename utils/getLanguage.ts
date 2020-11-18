import { NextPageContext } from "next";
import cookieCutter from "cookie-cutter";
import Cookies from "cookies";
import * as languageService from "../app/services/languageService";
import { LANGUAGE } from "../app/interfaces";

const acceptLanguages = [LANGUAGE.EN_US, LANGUAGE.DE_DE, LANGUAGE.RO_RO];
const defaultLanguage = acceptLanguages[0];

const getLanguage = async (ctx: NextPageContext): Promise<LANGUAGE> => {
  const languageByPathname = languageService.getLanguageByPathname(
    ctx.pathname
  );
  if (languageByPathname) {
    return languageByPathname;
  }

  const languageFromServer: LANGUAGE = ctx.req
    ? Object.fromEntries(
        ctx.req.headers.cookie.split(/; */).map((c) => {
          const [key, ...v] = c.split("=");
          return [key, decodeURIComponent(v.join("="))];
        })
      )["accept-language"]
    : (null as any);

  let finalLanguage = defaultLanguage;
  if (languageFromServer) {
    // check if user has set locale
    finalLanguage = acceptLanguages.includes(languageFromServer)
      ? languageFromServer
      : defaultLanguage;
  } else {
    const languageFromBrowser =
      (cookieCutter.get && cookieCutter.get("accept-language")) ||
      navigator.language ||
      defaultLanguage;
    finalLanguage = acceptLanguages.includes(languageFromBrowser)
      ? languageFromBrowser
      : defaultLanguage;
  }

  return finalLanguage;
};

export default getLanguage;
