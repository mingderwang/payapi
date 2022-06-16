const { send } = require("micro");
const microAuthGithub = require("microauth-github");
require("dotenv").config();

const options = {
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackUrl: "http://localhost:3000/auth/github/callback",
  path: "/auth/github",
  scope: "user",
};

const githubAuth = microAuthGithub(options);

// third `auth` argument will provide error or result of authentication
// so it will { err: errorObject } or { result: {
//  provider: 'github',
//  accessToken: 'blahblah',
//  info: userInfo
// }}
module.exports = githubAuth(async (req, res, auth) => {
  if (!auth) {
    return send(res, 404, "Not Found");
  }

  if (auth.err) {
    // Error handler
    return send(res, 403, "Forbidden");
  }

  return `Hello ${auth.result.info.login}`;
});
