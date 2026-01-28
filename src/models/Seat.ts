export type SeatType = "REGULAR" | "PREMIUM";
export type SeatStatus = "AVAILABLE" | "BOOKED" | "SELECTED";

export interface Seat {
  id: number;
  seatNumber: string;
  seatType: SeatType;
  status: SeatStatus;
}

export interface SeatRow {
  rowLabel: string;
  seats: Seat[];
}
