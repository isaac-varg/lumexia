import { DateTime } from "luxon";

// helper to deal with datepicker date to luxon
export const toLuxonDateTime = (dateInput: string | Date | null | undefined): DateTime => {
  if (!dateInput) {
    return DateTime.invalid('No date input provided');
  }
  if (dateInput instanceof Date) {
    return DateTime.fromJSDate(dateInput);
  }
  return DateTime.fromISO(dateInput);
};

