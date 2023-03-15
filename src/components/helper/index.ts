export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken") as string);
  // return false
};

export const getUserId = () => {
  return JSON.parse(localStorage.getItem("user-id") as string);
};

export const getIdAlums = () => {
  return JSON.parse(localStorage.getItem("id-album") as string);
};
