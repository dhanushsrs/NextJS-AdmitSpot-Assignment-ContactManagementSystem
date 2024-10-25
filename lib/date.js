import { utcToZonedTime, format } from "date-fns-tz";

export const formatDateForUser = (date, timezone) => {
  const utcDate = utcToZonedTime(date, timezone);
  return format(utcDate, "yyyy-MM-dd HH:mm:ssXXX", { timeZone: timezone });
};
