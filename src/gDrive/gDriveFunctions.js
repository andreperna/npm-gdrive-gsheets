import { config } from "../config/config.js";

import { gDrive } from "./gDrive.js";

// functions
async function getFolders() {
  const rootFolderId = config.rootFolderId;
  const gFolders = await gDrive.files.list({
    q: `'${rootFolderId}' 
                  in parents
                  and mimeType = 'application/vnd.google-apps.folder'`,
    fields: "files(id, name)",
  });
  return gFolders.data.files ? gFolders.data.files : false;
}

async function getFolderId(folderName) {
  const rootFolderId = config.rootFolderId;
  const gFolders = await gDrive.files.list({
    q: `'${rootFolderId}' 
                  in parents
                  and mimeType = 'application/vnd.google-apps.folder'
                  and name = '${folderName}'`,
    fields: "files(id, name, mimeType)",
  });
  return gFolders.data.files[0] ? gFolders.data.files[0].id : false;
}

async function getSheets(folderName) {
  try {
    const folderId = await getFolderId(folderName);
    const gSheets = await gDrive.files.list({
      q: `'${folderId}' 
                  in parents
                  and mimeType = 'application/vnd.google-apps.spreadsheet'`,
      fields: "files(id, name)",
    });
    return gSheets.data.files;
  } catch (error) {
    return false;
  }
}

async function getSheetId(folderName, sheetName) {
  try {
    const folderId = await getFolderId(folderName);
    const gSheets = await gDrive.files.list({
      q: `'${folderId}' 
      in parents
      and mimeType = 'application/vnd.google-apps.spreadsheet'
      and name = '${sheetName}'`,
      fields: "files(id, name, mimeType)",
    });
    return gSheets.data.files[0].id;
  } catch (error) {
    return false;
  }
}

export const gDriveFunctions = {
  getFolders,
  getFolderId,
  getSheets,
  getSheetId,
};
