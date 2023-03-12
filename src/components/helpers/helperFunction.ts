export const isEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value);
};

export const isPhone = (value: string) => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(value);
};
