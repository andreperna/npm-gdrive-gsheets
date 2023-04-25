function objectIsNotNull(obj) {
  const { id, ...rest } = obj;
  const arrRestValues = Object.values(rest);
  const strRest = arrRestValues.join("");

  return strRest !== "" ? true : false;
}

export function filterNotNullObjects(arrayOfObjects) {
  const arrFiltered = arrayOfObjects.filter((item) => objectIsNotNull(item));
  return arrFiltered;
}
