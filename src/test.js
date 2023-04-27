import { gDriveFunctions } from "./index.js";
import { gSheetFunctions } from "./index.js";

const spreadsheetId = await gDriveFunctions.getSheetId("app2", "tbl_users")

// console.log(await gSheetFunctions.getValuesNotNull(spreadsheetId))
// console.log(await gSheetFunctions.appendValues(spreadsheetId, {id: 5, nome:"ffff", idade:25, ff:"fff"}))
console.log(await gSheetFunctions.updateValues(spreadsheetId, 10, {id: 5, nome:"AAAAA", idade:33}))

// console.log(await gSheetFunctions.getValues(spreadsheetId, "a:b"))