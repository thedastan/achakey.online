export const getAccessToken = () => {
  return localStorage.getItem("accessToken") as string;
};

export const getUserId = () => {
  return localStorage.getItem("user-id") as string;
};

export const getIdAlums = () => {
  return localStorage.getItem("id-album") as string;
};
