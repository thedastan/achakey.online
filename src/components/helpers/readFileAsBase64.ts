export const readFileAsBase64 = async (fileUrl: string): Promise<string> => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    reader.onload = () => {
      const base64 = btoa(reader.result as string);
      resolve(base64);
    };

    reader.readAsBinaryString(blob);
  });
};
