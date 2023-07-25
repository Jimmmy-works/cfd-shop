export const fomatCurrency = (data, type = "vi-VN") => {
  if (!data) {
    return 0;
  }
  return data.toLocaleString(type, { minimumFractionDigits: 0 });
};

// fomat time display
export const fomatTimeDisPlay = (data) => {
  if (!data) return null;
  const date = new Date(data);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const month = ("0" + date.getUTCMonth() + 1).slice(-2);
  const year = "0" + data.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
