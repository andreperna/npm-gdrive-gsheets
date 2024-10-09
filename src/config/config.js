import path from "node:path"
import dotenv from "dotenv";
// const dotenvFilePath = path.resolve(process.env.HOME , ".dotenv", ".env")
// const keyFilePath = path.resolve(process.env.HOME, ".dotenv", "secret.json")

const client_email = process.env.GOOGLE_CLIENT_EMAIL
const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
const projectId = process.env.GOOGLE_PROJECT_ID
const rootFolderId = process.env.ROOT_FOLDER_ID

// dotenv.config({path: dotenvFilePath, debug: true})



export const config = {
  client_email,
  private_key,
  projectId,
  rootFolderId,
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
};
