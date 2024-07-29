import { v4 as uuidv4 } from "uuid";

export const generateSessionId = async function () {
  return uuidv4();
};
