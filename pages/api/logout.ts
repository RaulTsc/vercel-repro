// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import getConfig from "next/config";
import { applySession } from "next-session";
import { getUrlWithSubdomain } from "@raultom/common-helpers/lib/helpers/navigation";
import { sessionOptions } from "../../app/auth";

export default async (req, res) => {
  await applySession(req, res, sessionOptions);

  if (req.method !== "POST") {
    return res.status(400);
  }

  req.session.isAuthenticated = false;
  res.writeHead(307, { Location: "/login" });
  res.end();
};
