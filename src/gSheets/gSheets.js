import { authClient } from "../gAuth/gAuth.js";

import { google } from "googleapis";

export const gSheets = google.sheets({
  version: "v4",
  auth: authClient,
});
