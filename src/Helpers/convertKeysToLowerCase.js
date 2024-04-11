export default function convertKeysToLowerCase(obj) {
  const convertedObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      convertedObject[lowerCaseKey] = obj[key];
    }
  }
  return convertedObject;
}
