// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import getConfig from "next/config";
import { applySession } from "next-session";
import { getUrlWithSubdomain } from "@raultom/common-helpers/lib/helpers/navigation";
import { sessionOptions } from "../../app/auth";
import Cookies from "cookies";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_PATH,
  ACCESS_TOKEN_COOKIE_DOMAIN,
  ACCESS_TOKEN_COOKIE_SECURE,
  ACCESS_TOKEN_COOKIE_SAME_SITE,
} from "../../app/helpers/constants";

export default async (req, res) => {
  await applySession(req, res, sessionOptions);

  if (req.method !== "POST") {
    return res.status(400);
  }

  const heimdalUrl = getUrlWithSubdomain(
    getConfig().publicRuntimeConfig.microservices.heimdall.baseUrl,
    req?.currentPartner?.subdomain
  );

  const body = JSON.parse(req.body);

  try {
    const { data, status } = await axios.post(`${heimdalUrl}/oauth/token`, {
      client_id: getConfig().serverRuntimeConfig.oauth.client.clientId,
      client_secret: getConfig().serverRuntimeConfig.oauth.client.clientSecret,
      grant_type: "password",
      username: body.email,
      password: body.password,
      scope: "offline *",
    });

    req.session.isAuthenticated = true;

    const cookies = new Cookies(req, res);
    cookies.set(ACCESS_TOKEN_COOKIE_NAME, data.access_token, {
      maxAge: data.expires_in,
      path: ACCESS_TOKEN_COOKIE_PATH,
      domain: ACCESS_TOKEN_COOKIE_DOMAIN,
      secure: ACCESS_TOKEN_COOKIE_SECURE,
      sameSite: ACCESS_TOKEN_COOKIE_SAME_SITE,
    });

    res.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
};
