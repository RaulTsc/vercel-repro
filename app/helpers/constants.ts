const __DEVELOPMENT__ = true;

export const ACCESS_TOKEN_COOKIE_NAME = __DEVELOPMENT__
  ? "dev.accessToken"
  : "accessToken";
export const ACCESS_TOKEN_COOKIE_DOMAIN = ".usevisitor.com";
export const ACCESS_TOKEN_COOKIE_PATH = "/";
export const ACCESS_TOKEN_COOKIE_SECURE = !__DEVELOPMENT__;
export const ACCESS_TOKEN_COOKIE_SAME_SITE = undefined;

export const PAGE_SIZES = {
  NORMAL: "1000px",
  LARGE: "1200px",
};

export const COLOR_LIST = [
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deepOrange",
  "brown",
  "grey",
  "pink",
  "purple",
  "indigo",
];
