export const Formatdate = (timestamp: any): string => {
  const date = new Date(timestamp?.toDate());
  return date.toLocaleString();
};
