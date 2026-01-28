export type PaymentMethod = "CREDIT" | "DEBIT";
export type PaymentStatus = "SUCCESS" | "FAILED" | "PENDING";

export interface PaymentRequest {
  bookingId: number;
  method: PaymentMethod;
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentResponse {
  id: number;
  bookingId: number;
  method: PaymentMethod;
  amount: number;
  discount: number;
  finalAmount: number;
  status: PaymentStatus;
  transactionId: string;
}

export interface Ticket {
  ticketId: string;
  movieName: string;
  theatreName: string;
  screenName: string;
  showTime: string;
  seats: string[];
  amountPaid: number;
  bookingDate: string;
}
