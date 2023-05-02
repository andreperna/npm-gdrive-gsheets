import { gSheets } from "./gSheets.js";
import { v4 as uuidv4 } from "uuid"

import { arrayToObject } from "../helpers/arrayToObject.js";
import { objectToResourceValues } from "../helpers/objectToResourceValues.js";
import { filterNotNullObjects } from "../helpers/filterNotNullObjects.js";

// get columns
async function getColumns(spreadsheetId, range = "1:1") {
  range = range.search(/[a-z, A-Z]/g) >= 0 ? range.replace(/[0-9]/g, "") : "1:1"
  const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
  const arrColumns = response.data.values[0];
  return arrColumns;
}

// get next id
async function getNextId(spreadsheetId) {
  const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range: "a:a" });
  const arrColumnId = response.data.values
  arrColumnId.shift() // remove column id name
  const arrColumnIdNumber = arrColumnId.filter((item) => Number(item[0]))
  const currentId = Math.max(...arrColumnIdNumber)
  const nextId = currentId === -Infinity ? 1 : currentId + 1
  return nextId
}

// get row by id
async function getRow(spreadsheetId, id) {
  const strId = typeof id === "string" ? id : String(id);
  const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range: "a:a" });
  const arrValues = response.data.values;

  const row = arrValues.findIndex((item) => item[0] === strId) + 1;

  const result = row > 1 ? row : false;
  return result;
}

// get values
async function getValues(spreadsheetId, range = "a:z") {
  try {
    const arrKeys = await getColumns(spreadsheetId, range);
    const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
    const arrValues = response.data.values;
    arrValues.shift() // remove first line
    return arrayToObject(arrKeys, arrValues)
  } catch {
    return false;
  }
}

// get values not null
async function getValuesNotNull(spreadsheetId, range = "a:z") {
  try {
    const arrKeys = await getColumns(spreadsheetId, range);
    const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
    const arrValues = response.data.values;
    arrValues.shift() // remove first line
    const arrResult = arrayToObject(arrKeys, arrValues);
    return filterNotNullObjects(arrResult)
  } catch {
    return false;
  }
}

// get value by id
async function getValueById(spreadsheetId, id) {
  try {
    const arrKeys = await getColumns(spreadsheetId);
    const row = await getRow(spreadsheetId, id);
    const range = `${row}:${row}`;
    const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
    const arrValues = response.data.values;
    return arrayToObject(arrKeys, arrValues)[0];
  } catch {
    return false;
  }
}

// get value by id not null
async function getValueByIdNotNull(spreadsheetId, id) {
  try {
    const arrKeys = await getColumns(spreadsheetId);
    const row = await getRow(spreadsheetId, id);
    const range = `${row}:${row}`;
    const response = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
    const arrValues = response.data.values;
    const result = arrayToObject(arrKeys, arrValues);
    return filterNotNullObjects(result).length ? filterNotNullObjects(result)[0] : false
  } catch {
    return false;
  }
}

// append values
async function appendValues(spreadsheetId, objToAppend, typeId = "number", range = "a:z") {
  try {

    if (!objToAppend.id) {
      const getId = {
        number: await getNextId(spreadsheetId),
        uuidv4: uuidv4()
      }
      objToAppend.id = getId[typeId]
    }

    const arrKeys = await getColumns(spreadsheetId, range);
    const arrResourceValues = objectToResourceValues(arrKeys, objToAppend);

    const response = await gSheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: arrResourceValues,
      },
    });

    const result = arrayToObject(arrKeys, arrResourceValues)[0];
    return response.status === 200 ? result : false;
  } catch {
    return false;
  }
}

// update values
async function updateValues(spreadsheetId, id, objToUpdate) {
  try {
    // const strId = typeof id === "string" ? id : String(id);
    const arrKeys = await getColumns(spreadsheetId);
    const row = await getRow(spreadsheetId, id);
    const range = `${row}:${row}`;

    const responseValues = await gSheets.spreadsheets.values.get({ spreadsheetId, range });
    const arrCurrentValues = responseValues.data.values

    const objCurrentValues = arrayToObject(arrKeys, arrCurrentValues)[0]

    Object.keys(objCurrentValues).forEach((curr) => {
      objCurrentValues[curr] = objToUpdate[curr] || objCurrentValues[curr]
    })

    const objUpdated = objCurrentValues

    const arrResourceValues = await objectToResourceValues(arrKeys, objUpdated);

    const response = await gSheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: arrResourceValues,
      },
    });

    return objUpdated;
  } catch {
    return false;
  }
}

// clear values
async function clearValues(spreadsheetId, id) {
  try {
    // const strId = typeof id === "string" ? id : String(id);
    const row = await getRow(spreadsheetId, id);
    const range = `b${row}:${row}`;

    const response = await gSheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });

    return response.status === 200 ? true : false;
  } catch {
    return false;
  }
}

export const gSheetFunctions = {
  getColumns,
  getNextId,
  getRow,
  getValues,
  getValuesNotNull,
  getValueById,
  getValueByIdNotNull,
  appendValues,
  updateValues,
  clearValues,
};
