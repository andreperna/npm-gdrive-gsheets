import { config } from "../config/config.js";

import { google } from "googleapis";

const gAuth = new google.auth.GoogleAuth({
  keyFile: config.keyFile,
  scopes: config.scopes,
});

export const authClient = await gAuth.getClient();
