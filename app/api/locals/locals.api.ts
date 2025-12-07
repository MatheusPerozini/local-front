import { api } from "..";

export const getLocals = async () => {
  const res = await api.get("/locals/");
  return res.data;
};
