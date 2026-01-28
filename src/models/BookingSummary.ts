export interface BookingSummary {
  movieName: string;
  theatreName: string;
  screenName: string;
  showTime: string;
  seats: string[];
  seatPriceTotal: number;
  convenienceFee: number;
  gst: number;
  totalAmount: number;
}
