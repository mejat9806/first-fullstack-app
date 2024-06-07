export const dateFormat = (dateData: string, noTime = true) => {
  let formatedDate;

  if (noTime) {
    formatedDate = new Date(dateData).toLocaleString("en-MY", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    });
  } else {
    formatedDate = new Date(dateData).toLocaleString("en-MY", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: true,
      timeZone: "Asia/Kuala_Lumpur",
    });
  }

  return formatedDate;
};
