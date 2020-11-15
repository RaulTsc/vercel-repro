import { applySession } from "next-session";

export const sessionOptions = {};

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, sessionOptions);

  console.log("session", req.session, req.session.isAuthenticated);
  if (!req.session.isAuthenticated) {
    // If no user, redirect to login
    res.writeHead(307, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return { props: {} };
}
