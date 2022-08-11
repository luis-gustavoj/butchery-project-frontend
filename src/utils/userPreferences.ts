const isWindowAvailable = typeof window !== "undefined";

const save = (key: string, value: any) => {
  if (!isWindowAvailable) return;
  const userPreferences = get() || {};
  userPreferences[key] = value;
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
};

const get = () => {
  if (!isWindowAvailable) return;
  return JSON.parse(localStorage.getItem("userPreferences"));
};

const getByKey = (key: string) => {
  if (!isWindowAvailable) return;
  const userPreferences = get();
  return userPreferences?.[key];
};

export const userPreferences = {
  save,
  get,
  getByKey,
};
