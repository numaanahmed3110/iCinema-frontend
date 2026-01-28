import { Card, ListGroup, Button } from "react-bootstrap";
import { Seat } from "../models/Seat";

interface BookingSummaryProps {
  movieName: string;
  theatreName: string;
  showTime: string;
  selectedSeats: Seat[];
  seatPrice: number;
  convenienceFee: number;
  gst: number;
  onProceed: () => void;
  disabled?: boolean;
}

const BookingSummary = ({
  movieName,
  theatreName,
  showTime,
  selectedSeats,
  seatPrice,
  convenienceFee,
  gst,
  onProceed,
  disabled = false,
}: BookingSummaryProps) => {
  const regularSeats = selectedSeats.filter((s) => s.seatType === "REGULAR");
  const premiumSeats = selectedSeats.filter((s) => s.seatType === "PREMIUM");

  const totalAmount = seatPrice + convenienceFee + gst;

  return (
    <Card className="bg-dark text-white border-secondary">
      <Card.Header className="bg-secondary">
        <h5 className="mb-0">Booking Summary</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <h6 className="text-danger">{movieName}</h6>
          <p className="small mb-1 text-muted">{theatreName}</p>
          <p className="small mb-0 text-muted">
            {new Date(showTime).toLocaleString()}
          </p>
        </div>

        <div className="mb-3">
          <p className="mb-1">
            <strong>Selected Seats ({selectedSeats.length}):</strong>
          </p>
          <div>
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="badge bg-warning text-dark me-1 mb-1"
                >
                  {seat.seatNumber}
                </span>
              ))
            ) : (
              <span className="text-muted small">No seats selected</span>
            )}
          </div>
        </div>

        <hr className="border-secondary" />

        <ListGroup variant="flush" className="bg-dark">
          {regularSeats.length > 0 && (
            <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
              <span>Regular ({regularSeats.length}x)</span>
              <span>
                ₹
                {(
                  regularSeats.length * (seatPrice / selectedSeats.length || 0)
                ).toFixed(2)}
              </span>
            </ListGroup.Item>
          )}
          {premiumSeats.length > 0 && (
            <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
              <span>Premium ({premiumSeats.length}x)</span>
              <span>
                ₹
                {(
                  premiumSeats.length * (seatPrice / selectedSeats.length || 0)
                ).toFixed(2)}
              </span>
            </ListGroup.Item>
          )}
          <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
            <span>Seat Price Total</span>
            <span>₹{seatPrice.toFixed(2)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
            <span>Convenience Fee</span>
            <span>₹{convenienceFee.toFixed(2)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between fw-bold fs-5">
            <span>Total</span>
            <span className="text-success">₹{totalAmount.toFixed(2)}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="bg-dark border-secondary">
        <Button
          variant="danger"
          className="w-100"
          onClick={onProceed}
          disabled={disabled || selectedSeats.length === 0}
        >
          Pay Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BookingSummary;
