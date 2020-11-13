import * as uuid from "uuid";
import * as cookieHelper from "cookie";
import * as cookieService from "@raultom/common-helpers/lib/services/cookieService/cookieService";
import getConfig from "next/config";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_PATH,
  ACCESS_TOKEN_COOKIE_DOMAIN,
  ACCESS_TOKEN_COOKIE_SECURE,
  ACCESS_TOKEN_COOKIE_SAME_SITE,
} from "./constants";
import { LANGUAGE } from "../interfaces";

const getCookie = (name: string): string | null => {
  if (window) {
    const cookies = cookieHelper.parse(window.document.cookie);
    return cookies[name] || null;
  }

  return null;
};

const deleteCookie = () => {
  cookieService.deleteCookie({
    name: ACCESS_TOKEN_COOKIE_NAME,
    path: ACCESS_TOKEN_COOKIE_PATH,
    domain: ACCESS_TOKEN_COOKIE_DOMAIN,
    secure: ACCESS_TOKEN_COOKIE_SECURE,
    sameSite: ACCESS_TOKEN_COOKIE_SAME_SITE,
  });
};

const isForbidden = (status: number): boolean => [401, 403].includes(status);

const refreshToken = async () => {
  const response = await fetch(
    `${
      getConfig().publicRuntimeConfig.microservices.myApp.baseUrl
    }/refreshtoken`,
    {
      method: "POST",
    }
  );

  await response.json();
};

const doFetch = async <T extends any>(
  url: string,
  method: string,
  payload?: T
) => {
  if (!url || !method) {
    throw new Error("Cannot do fetch because the url or method are empty");
  }

  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
  const language = getCookie("accept-language");

  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json, text/javascript",
      "Content-Type": "application/json",
      "Accept-Language": (language as string) || LANGUAGE.EN_US,
      "X-Request-ID": uuid.v4(),
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  if (accessToken && options.headers) {
    (options.headers as any).Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, options);
  if (isForbidden(response.status)) {
    deleteCookie();
    await refreshToken();
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    response = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    });
  }

  return response;
};

const buildApiClient = (baseUrl: string) => ({
  post: async <T extends any>(url: string, payload: T) => {
    return doFetch<T>(`${baseUrl}${url}`, "post", payload);
  },
  get: async (url: string) => {
    return doFetch(`${baseUrl}${url}`, "get");
  },
  put: async <T extends any>(url: string, payload: T) => {
    return doFetch<T>(`${baseUrl}${url}`, "put", payload);
  },
  patch: async <T extends any>(url: string, payload: T) => {
    return doFetch<T>(`${baseUrl}${url}`, "patch", payload);
  },
  delete: async (url: string) => {
    return doFetch(`${baseUrl}${url}`, "delete");
  },
});

export const prismApi = buildApiClient(
  getConfig().publicRuntimeConfig.microservices.prismApi.baseUrl
);
export const myApp = buildApiClient(
  getConfig().publicRuntimeConfig.microservices.myApp.baseUrl
);
export const heimdall = buildApiClient(
  `${getConfig().publicRuntimeConfig.microservices.heimdall.baseUrl}/api`
);
export const templatesApi = buildApiClient(
  getConfig().publicRuntimeConfig.microservices.templatesApi.baseUrl
);
export const partnerApi = buildApiClient(
  getConfig().publicRuntimeConfig.microservices.partnerApi.baseUrl
);
