import path from "node:path"
import dotenv from "dotenv";
const dotenvFilePath = path.resolve(process.env.HOME , ".dotenv", ".env")
const keyFilePath = path.resolve(process.env.HOME, ".dotenv", "secret.json")

dotenv.config({path: dotenvFilePath, debug: true})



export const config = {
  rootFolderId: "1dLr-gM6TXFoxuKOT1GoqGcePhTeNor3X",
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
};
