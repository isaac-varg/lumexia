import { DateRange } from "react-day-picker";
import { toLuxonDateTime } from "./toLuxonDateTime";
import { dateFormatString } from "@/configs/data/dateFormatString";
import { isSameDate } from "./isSameDate";

export const getDisplayDate = (selectedRange: DateRange | null | undefined) => {
  if (!selectedRange?.from) {
    return 'No dates selected'
  }
  const luxonStartDate = toLuxonDateTime(selectedRange.from);
  const luxonEndDate = toLuxonDateTime(selectedRange.to || selectedRange.from);

  const formattedStartDate = luxonStartDate.toFormat(dateFormatString);
  const formattedEndDate = luxonEndDate.toFormat(dateFormatString);

  const isSameDay = isSameDate(selectedRange);

  if (isSameDay) {
    return formattedStartDate
  } else {
    return `${formattedStartDate} to ${formattedEndDate}`
  }

}
