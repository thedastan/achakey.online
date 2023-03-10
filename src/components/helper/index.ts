export const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken") as string);
};

export const getUserId = () => {
  return JSON.parse(localStorage.getItem("user-id") as string);
};
