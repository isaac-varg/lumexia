import { DateRange } from "react-day-picker";
import { toLuxonDateTime } from "./toLuxonDateTime";

export const isSameDate = (selectedRange: DateRange | null | undefined) => {
  if (!selectedRange) return;

  const { from, to } = selectedRange;

  let isSameDate = false;

  if (from && to) {
    const startDateTime = toLuxonDateTime(from);
    const endDateTime = toLuxonDateTime(to);

    if (startDateTime.isValid && endDateTime.isValid) {
      isSameDate = startDateTime.hasSame(endDateTime, 'day');
    } else {
      console.warn("Invalid date(s) received for comparison.");
    }
  } else if (from) {
    isSameDate = true
  }

  return isSameDate
}
