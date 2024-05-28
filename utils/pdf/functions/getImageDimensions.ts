export const getImageDimensions = (
  base64Image: string
): Promise<{ width: number; height: number }> => {
  const img = new Image();
  img.src = base64Image;

  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
  });
};
