export function arrayToObject(arrKeys, arrValues) {
  const keys = arrKeys;
  const values = arrValues;

  const result = values.map((item) => {
    const arrayOfObjects = keys.reduce((acc, curr, idx) => {
      acc[curr] = item[idx] || "";
      return acc;
    }, {});
    return arrayOfObjects;
  });

  return result;
}
