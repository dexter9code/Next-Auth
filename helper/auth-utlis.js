import bcrypt from "bcrypt";

export const hashedPassword = async function (pass) {
  return await bcrypt.hash(pass, 12);
};

export const checkPassword = async function (textPassword, hashedPassword) {
  return await bcrypt.compare(textPassword, hashedPassword);
};
