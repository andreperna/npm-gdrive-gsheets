import { authClient } from "../gAuth/gAuth.js";

import { google } from "googleapis";

export const gDrive = google.drive({
  version: "v3",
  auth: authClient,
});
