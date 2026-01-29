import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Movie } from "../models/Movie";
import { Show } from "../models/Show";
import { Seat, SeatRow } from "../models/Seat";
import { Theatre } from "../models/Theatre";
import Navbar from "../components/Navbar";
import SeatGrid from "../components/SeatGrid";
import BookingSummary from "../components/BookingSummary";
import Footer from "../components/Footer";

interface LocationState {
  movie: Movie;
  show: Show;
  theatre: Theatre;
  ticketCount: number;
}

const SeatSelectionPage = () => {
  const { showId } = useParams<{ showId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState;

  const [seatLayout, setSeatLayout] = useState<SeatRow[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [pricing, setPricing] = useState({
    seatPrice: 0,
    convenienceFee: 0,
    gst: 0,
  });

  const movie = state?.movie;
  const show = state?.show;
  const theatre = state?.theatre;
  const maxSeats = state?.ticketCount || 1;

  // Mock seat layout for development
  const generateMockSeatLayout = (): SeatRow[] => {
    const rows: SeatRow[] = [];
    const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seatsPerRow = 12;

    rowLabels.forEach((label, rowIndex) => {
      const seats: Seat[] = [];
      for (let i = 1; i <= seatsPerRow; i++) {
        const isPremium = rowIndex < 2;
        const isBooked = Math.random() < 0.3; // 30% chance of being booked

        seats.push({
          id: rowIndex * seatsPerRow + i,
          seatNumber: `${label}${i}`,
          seatType: isPremium ? "PREMIUM" : "REGULAR",
          status: isBooked ? "BOOKED" : "AVAILABLE",
        });
      }
      rows.push({ rowLabel: label, seats });
    });

    return rows;
  };

  useEffect(() => {
    if (!movie || !show) {
      navigate("/movies");
      return;
    }
    fetchSeatLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showId]);

  useEffect(() => {
    calculatePricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats]);

  const fetchSeatLayout = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/seating/show/${showId}/seats`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        // Transform API response to SeatRow format if needed
        const data = res.data;
        if (Array.isArray(data) && data[0]?.rowLabel) {
          setSeatLayout(data);
        } else {
          // If API returns flat array, group by row
          setSeatLayout(groupSeatsByRow(data));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seats:", err);
        setSeatLayout(generateMockSeatLayout());
        setLoading(false);
      });
  };

  const groupSeatsByRow = (seats: Seat[]): SeatRow[] => {
    const rowMap = new Map<string, Seat[]>();

    seats.forEach((seat) => {
      const rowLabel = seat.seatNumber.charAt(0);
      if (!rowMap.has(rowLabel)) {
        rowMap.set(rowLabel, []);
      }
      rowMap.get(rowLabel)!.push(seat);
    });

    const rows: SeatRow[] = [];
    rowMap.forEach((seats, rowLabel) => {
      rows.push({
        rowLabel,
        seats: seats.sort((a, b) => {
          const numA = parseInt(a.seatNumber.slice(1));
          const numB = parseInt(b.seatNumber.slice(1));
          return numA - numB;
        }),
      });
    });

    return rows.sort((a, b) => a.rowLabel.localeCompare(b.rowLabel));
  };

  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === "BOOKED") return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculatePricing = () => {
    if (selectedSeats.length === 0) {
      setPricing({ seatPrice: 0, convenienceFee: 0, gst: 0 });
      return;
    }

    const seatIds = selectedSeats.map((s) => s.id).join(",");
    const token = localStorage.getItem("token");

    axios
      .get(
        `http://localhost:8080/api/seating/show/${showId}/pricing?seats=${seatIds}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      )
      .then((res) => {
        setPricing({
          seatPrice: res.data.seatPriceTotal || res.data.seatPrice,
          convenienceFee: res.data.convenienceFee,
          gst: res.data.gst,
        });
      })
      .catch(() => {
        // Calculate locally if API fails
        const basePrice = show?.price || 250;
        const premiumMultiplier = 1.5;

        let seatPrice = 0;
        selectedSeats.forEach((seat) => {
          seatPrice +=
            seat.seatType === "PREMIUM"
              ? basePrice * premiumMultiplier
              : basePrice;
        });

        const convenienceFee = selectedSeats.length * 30;
        const gst = (seatPrice + convenienceFee) * 0.18;

        setPricing({
          seatPrice,
          convenienceFee,
          gst,
        });
      });
  };

  const handleProceedToPayment = () => {
    const totalAmount =
      pricing.seatPrice + pricing.convenienceFee + pricing.gst;

    navigate("/payment", {
      state: {
        movie,
        show,
        theatre,
        selectedSeats,
        pricing: {
          ...pricing,
          totalAmount,
        },
      },
    });
  };

  if (!movie || !show) {
    return (
      <div className="bg-dark min-vh-100">
        <Navbar />
        <Container className="py-5 text-center">
          <Alert variant="warning">
            Invalid booking session. Please start over.
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />

      <Container className="py-4">
        {/* Header */}
        <div className="text-white mb-4">
          <h2 className="fw-bold">
            <span className="text-danger">Select</span> Your Seats
          </h2>
          <p className="text-muted">
            {movie.name} • {theatre?.name} •{" "}
            {new Date(show.showTime).toLocaleString()}
          </p>
          <Alert variant="info" className="d-inline-block">
            Select exactly <strong>{maxSeats}</strong> seat
            {maxSeats > 1 ? "s" : ""} ({selectedSeats.length}/{maxSeats}{" "}
            selected)
          </Alert>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
            <p className="text-muted mt-3">Loading seat layout...</p>
          </div>
        ) : (
          <Row>
            {/* Seat Grid */}
            <Col lg={8} className="mb-4">
              <SeatGrid
                seatLayout={seatLayout}
                selectedSeats={selectedSeats}
                maxSeats={maxSeats}
                onSeatSelect={handleSeatSelect}
              />
            </Col>

            {/* Booking Summary */}
            <Col lg={4}>
              <div className="sticky-top" style={{ top: "100px" }}>
                <BookingSummary
                  movieName={movie.name}
                  theatreName={theatre?.name || "Theatre"}
                  showTime={show.showTime}
                  selectedSeats={selectedSeats}
                  seatPrice={pricing.seatPrice}
                  convenienceFee={pricing.convenienceFee}
                  gst={pricing.gst}
                  onProceed={handleProceedToPayment}
                  disabled={selectedSeats.length !== maxSeats}
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default SeatSelectionPage;
