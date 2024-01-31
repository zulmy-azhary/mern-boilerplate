import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, await bcrypt.genSalt());
};

export const checkPasswordMatch = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
