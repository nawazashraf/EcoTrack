export const kgToTon = (kg?: number | string) => {
  if (kg === undefined || kg === null) return "0.00";

  const value = typeof kg === "string" ? Number(kg) : kg;

  if (Number.isNaN(value)) return "0.00";

  return (value / 1000).toFixed(2);
};
