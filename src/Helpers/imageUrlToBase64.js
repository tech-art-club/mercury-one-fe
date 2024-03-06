export const imageUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const binary = [].slice.call(new Uint8Array(buffer));
  const base64 = btoa(binary.map((byte) => String.fromCharCode(byte)).join(''));
  console.log('Here');
  return `data:image/jpeg;base64,${base64}`;
};
