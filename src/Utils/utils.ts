export const Formatdate = (timestamp: any): string => {
  const date = new Date(timestamp?.toDate());
  return date.toLocaleString();
};

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
