export function objectToResourceValues(arrKeys, objectToResourceValues) {
  const objectToMap = objectToResourceValues.length ? objectToResourceValues : [objectToResourceValues];

  const arrResourceValues = objectToMap.map((item) => {
    const arrResourceValues = arrKeys.reduce((acc, curr, idx) => {
      acc[idx] = item[curr] || "";
      return acc;
    }, []);
    return arrResourceValues;
  });

  return arrResourceValues;
}
