export const getLocals = async () => {
  const res = await fetch(`${process.env.BASE_API_URL}/locals/`, { cache: "no-store" });
  return await res.json();
};
