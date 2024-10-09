import { config } from "../config/config.js";

import { google } from "googleapis";

// const gAuth = new google.auth.GoogleAuth({
//   keyFile: config.keyFile,
//   scopes: config.scopes,
// });

const gAuth = new google.auth.GoogleAuth({
  credentials: {
      client_email: config.client_email,
      private_key: config.private_key,
  },
  projectId: config.projectId,
  scopes: config.scopes,
});

export const authClient = await gAuth.getClient();
