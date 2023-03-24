export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phonePattern = /^\+[1-9]\d{1,14}$/;

export const isEmail = (value: string) => {
  const emailRegex = emailPattern;
  return emailRegex.test(value);
};

export const isPhone = (value: string) => {
  const phoneRegex = phonePattern;
  return phoneRegex.test(value);
};
