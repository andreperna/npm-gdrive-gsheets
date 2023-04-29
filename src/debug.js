let result = ""

import { gDriveFunctions } from "./index.js";
import { gSheetFunctions } from "./index.js";

const spreadsheetId = await gDriveFunctions.getSheetId("app2", "tbl_users")

// console.log(await gSheetFunctions.getValuesNotNull(spreadsheetId))
// console.log(await gSheetFunctions.appendValues(spreadsheetId, {id: 5, nome:"ffff", idade:25, ff:"fff"}))
// console.log(await gSheetFunctions.updateValues(spreadsheetId, 10, {id: 5, nome:"AAAAA", idade:33}))

// console.log(await gSheetFunctions.getValues(spreadsheetId, "a:b"))


// result = await gSheetFunctions.getColumns(spreadsheetId, "5:5")

// result = await gSheetFunctions.getNextId(spreadsheetId)

// result = await gSheetFunctions.getValues(spreadsheetId, "a1:b2")
// result = await gSheetFunctions.getValuesNotNull(spreadsheetId)

// result = await gSheetFunctions.getValueById(spreadsheetId, 8)

// result = await gSheetFunctions.clearValues(spreadsheetId, 8)

// result = await gSheetFunctions.updateValues(spreadsheetId, 8, {nome:"ddddd", idade: 25})


result = await gSheetFunctions.appendValues(spreadsheetId, {nome:"teste", idade: 25})





console.log(result)