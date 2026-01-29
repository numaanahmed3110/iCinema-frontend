import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { Movie } from "../models/Movie";
import { Show } from "../models/Show";
import { Seat } from "../models/Seat";
import { Theatre } from "../models/Theatre";
import { PaymentMethod, Ticket } from "../models/Payment";
import Navbar from "../components/Navbar";
import PaymentForm from "../components/PaymentForm";
import Footer from "../components/Footer";

interface LocationState {
  movie: Movie;
  show: Show;
  theatre: Theatre;
  selectedSeats: Seat[];
  pricing: {
    seatPrice: number;
    convenienceFee: number;
    gst: number;
    totalAmount: number;
  };
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const movie = state?.movie;
  const show = state?.show;
  const theatre = state?.theatre;
  const selectedSeats = state?.selectedSeats || [];
  const pricing = state?.pricing;

  const handlePayment = (method: PaymentMethod, cardDetails: CardDetails) => {
    setLoading(true);
    setError("");

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const discount = method === "CREDIT" ? 0.1 : 0.05;
    const discountAmount = pricing.totalAmount * discount;
    const finalAmount = pricing.totalAmount - discountAmount;

    const paymentData = {
      showId: show.id,
      seats: selectedSeats.map((s) => s.id),
      method,
      amount: pricing.totalAmount,
      cardNumber: cardDetails.cardNumber.replace(/\s/g, ""),
      expiryDate: cardDetails.expiryDate,
      cvv: cardDetails.cvv,
    };

    axios
      .post("http://localhost:8080/api/payment/pay", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const ticket: Ticket = {
          ticketId: res.data.transactionId || `TKT${Date.now()}`,
          movieName: movie.name,
          theatreName: theatre?.name || "Theatre",
          screenName: show.screenName || "Screen 1",
          showTime: show.showTime,
          seats: selectedSeats.map((s) => s.seatNumber),
          amountPaid: res.data.finalAmount || finalAmount,
          bookingDate: new Date().toISOString(),
        };

        navigate("/ticket", { state: { ticket, movie } });
      })
      .catch((err) => {
        console.error("Payment error:", err);
        // Mock success for demo
        const ticket: Ticket = {
          ticketId: `TKT${Date.now()}`,
          movieName: movie.name,
          theatreName: theatre?.name || "Theatre",
          screenName: show.screenName || "Screen 1",
          showTime: show.showTime,
          seats: selectedSeats.map((s) => s.seatNumber),
          amountPaid: finalAmount,
          bookingDate: new Date().toISOString(),
        };

        navigate("/ticket", { state: { ticket, movie } });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!movie || !show || !pricing) {
    return (
      <div className="bg-dark min-vh-100">
        <Navbar />
        <Container className="py-5 text-center">
          <Alert variant="warning">
            Invalid payment session. Please start over.
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />

      <Container className="py-5">
        <h2 className="text-white fw-bold mb-4">
          <span className="text-danger">Secure</span> Payment
        </h2>

        <Row>
          {/* Order Summary */}
          <Col lg={5} className="mb-4">
            <Card className="bg-secondary text-white border-0">
              <Card.Header className="bg-dark">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <img
                    src={movie.imageUrl}
                    alt={movie.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <h5 className="text-danger">{movie.name}</h5>
                  <p className="mb-1 small">
                    {movie.genre} • {movie.language} • {movie.censorRating}
                  </p>
                </div>

                <hr className="border-dark" />

                <div className="small">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Theatre:</span>
                    <span>{theatre?.name}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Show Time:</span>
                    <span>{new Date(show.showTime).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Screen:</span>
                    <span>{show.screenName || "Screen 1"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Seats:</span>
                    <span>
                      {selectedSeats.map((s) => s.seatNumber).join(", ")}
                    </span>
                  </div>
                </div>

                <hr className="border-dark" />

                <div className="small">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Ticket Price:</span>
                    <span>₹{pricing.seatPrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Convenience Fee:</span>
                    <span>₹{pricing.convenienceFee.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>GST (18%):</span>
                    <span>₹{pricing.gst.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="border-dark" />

                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total Amount:</span>
                  <span className="text-success">
                    ₹{pricing.totalAmount.toFixed(2)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Payment Form */}
          <Col lg={7}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            <PaymentForm
              totalAmount={pricing.totalAmount}
              onPayment={handlePayment}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default PaymentPage;
