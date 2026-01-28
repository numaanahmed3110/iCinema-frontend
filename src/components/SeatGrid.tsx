import { Row, Col, Button } from "react-bootstrap";
import { Seat, SeatRow } from "../models/Seat";

interface SeatGridProps {
  seatLayout: SeatRow[];
  selectedSeats: Seat[];
  maxSeats: number;
  onSeatSelect: (seat: Seat) => void;
}

const SeatGrid = ({
  seatLayout,
  selectedSeats,
  maxSeats,
  onSeatSelect,
}: SeatGridProps) => {
  const getSeatColor = (seat: Seat): string => {
    if (seat.status === "BOOKED") return "secondary";
    if (selectedSeats.some((s) => s.id === seat.id)) return "warning";
    return seat.seatType === "PREMIUM" ? "info" : "success";
  };

  const isSeatDisabled = (seat: Seat): boolean => {
    if (seat.status === "BOOKED") return true;
    if (selectedSeats.some((s) => s.id === seat.id)) return false;
    return selectedSeats.length >= maxSeats;
  };

  return (
    <div className="bg-dark p-4 rounded">
      {/* Screen indicator */}
      <div className="text-center mb-4">
        <div
          className="bg-light mx-auto rounded-bottom"
          style={{
            width: "80%",
            height: "8px",
            boxShadow: "0 0 20px rgba(255,255,255,0.5)",
          }}
        />
        <p className="text-muted small mt-2">SCREEN THIS WAY</p>
      </div>

      {/* Legend */}
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <span className="d-inline-flex align-items-center me-3">
            <span className="badge bg-success me-1">&nbsp;&nbsp;</span>
            <small className="text-white">Available</small>
          </span>
          <span className="d-inline-flex align-items-center me-3">
            <span className="badge bg-info me-1">&nbsp;&nbsp;</span>
            <small className="text-white">Premium</small>
          </span>
          <span className="d-inline-flex align-items-center me-3">
            <span className="badge bg-warning me-1">&nbsp;&nbsp;</span>
            <small className="text-white">Selected</small>
          </span>
          <span className="d-inline-flex align-items-center">
            <span className="badge bg-secondary me-1">&nbsp;&nbsp;</span>
            <small className="text-white">Booked</small>
          </span>
        </Col>
      </Row>

      {/* Seats Grid */}
      <div className="d-flex flex-column align-items-center">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex align-items-center mb-2">
            <span className="text-white fw-bold me-3" style={{ width: "30px" }}>
              {row.rowLabel}
            </span>
            <div className="d-flex gap-1">
              {row.seats.map((seat) => (
                <Button
                  key={seat.id}
                  variant={getSeatColor(seat)}
                  size="sm"
                  disabled={isSeatDisabled(seat)}
                  onClick={() => onSeatSelect(seat)}
                  style={{
                    width: "35px",
                    height: "35px",
                    fontSize: "10px",
                    padding: "0",
                  }}
                  title={`${seat.seatNumber} - ${seat.seatType}`}
                >
                  {seat.seatNumber.slice(-1)}
                </Button>
              ))}
            </div>
            <span className="text-white fw-bold ms-3" style={{ width: "30px" }}>
              {row.rowLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;
