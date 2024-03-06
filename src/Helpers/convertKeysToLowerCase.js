export default function convertKeysToLowerCase(obj) {
  const convertedObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      convertedObject[key.toLowerCase()] = obj[key];
    }
  }
  return convertedObject;
}
