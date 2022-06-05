import { FormattedDate } from "@/types/apiTypes";

export function formatDate(dateString: string): FormattedDate {
  const datePieces = ["year", "month", "day"];
  const dateFragment = dateString.split("-");
  return datePieces.reduce(
    (accumulator, datePiece, index) => {
      return { ...accumulator, [datePiece]: dateFragment[index] };
    },
    { year: 0, month: 0, day: 0 }
  );
}

export function formatLength(totalMinutes: number) {
  const hours = Math.trunc(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours + "h " + minutes + "min";
}
