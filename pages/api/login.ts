// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import getConfig from "next/config";
import { applySession } from "next-session";
import { getUrlWithSubdomain } from "@raultom/common-helpers/lib/helpers/navigation";
import { sessionOptions } from "../../app/auth";

export default async (req, res) => {
  await applySession(req, res, sessionOptions);

  console.log("isAuth", req.session.isAuthenticated);

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

    console.log("response", data, status);

    req.session.isAuthenticated = true;

    res.json({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    });
  } catch (err) {
    console.log("got err", err.response.status);
    res.status(err.response.status).json(err.response.data);
  }
};
