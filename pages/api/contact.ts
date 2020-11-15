// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as nodemailer from "nodemailer";
import { applySession } from "next-session";
import { sessionOptions } from "../../app/auth";

interface IGmailResponse extends Object {}

export const sendMail = async ({
  to,
  cc,
  subject,
  html,
  text,
  partner,
}: any): Promise<IGmailResponse> => {
  const email = "raultom111@gmail.com";
  const password = "BQRGU4fT8M";
  const fromName = (partner && partner.name) || "Website";
  const from = `"${fromName}" <${email}>`;
  const transport = `smtps://${encodeURIComponent(
    email
  )}:${password}@smtp.gmail.com`;
  const transporter = nodemailer.createTransport(transport);
  const mailOptions: nodemailer.SendMailOptions = {
    from,
    to,
    cc,
    subject,
    html,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }

      return resolve(info);
    });
  });
};

export default async (req, res) => {
  await applySession(req, res, sessionOptions);

  if (req.method !== "POST") {
    return res.status(400);
  }

  const body = JSON.parse(req.body);

  await sendMail({
    to: "tomescu.raul@gmail.com",
    subject: `New contact request from ${body.firstName} ${body.lastName}`,
    html: `
      <ul style="list-style-type: none; padding-left: 0px">
        <li>First name: <strong>${body.firstName}</strong></li>
        <li>Last name: <strong>${body.lastName}</strong></li>
        <li>E-mail: <strong>${body.email}</strong></li>
        <li>Phone number: <strong>${body.phoneNumber}</strong></li>
        <li>Description: <strong>${body.hotelDescription}</strong></li>
      </ul>
    `,
    text: JSON.stringify(body, null, 2),
  });

  res.json({});
};
