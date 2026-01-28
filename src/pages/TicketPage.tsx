import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Alert } from "react-bootstrap";
import html2canvas from "html2canvas";
import { Movie } from "../models/Movie";
import { Ticket } from "../models/Payment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LocationState {
  ticket: Ticket;
  movie: Movie;
}

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);

  const state = location.state as LocationState;
  const ticket = state?.ticket;
  const movie = state?.movie;

  const handleDownloadTicket = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          backgroundColor: "#1a1a2e",
          scale: 2,
        });

        const link = document.createElement("a");
        link.download = `iCinema_Ticket_${ticket.ticketId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Error generating ticket:", error);
      }
    }
  };

  if (!ticket) {
    return (
      <div className="bg-dark min-vh-100">
        <Navbar />
        <Container className="py-5 text-center">
          <Alert variant="warning">
            No ticket found. Please make a booking first.
          </Alert>
          <Button variant="danger" onClick={() => navigate("/movies")}>
            Browse Movies
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />

      <Container className="py-5">
        {/* Success Message */}
        <div className="text-center mb-5">
          <div className="fs-1 mb-3">🎉</div>
          <h1 className="text-white fw-bold">Booking Confirmed!</h1>
          <p className="text-muted">
            Your tickets have been booked successfully
          </p>
        </div>

        {/* Ticket Card */}
        <Row className="justify-content-center mb-4">
          <Col lg={8}>
            <div ref={ticketRef}>
              <Card
                className="border-0 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                }}
              >
                {/* Ticket Header */}
                <Card.Header className="bg-danger text-white text-center py-3">
                  <h3 className="mb-0 fw-bold">
                    <span className="me-2">🎬</span>
                    iCinema
                  </h3>
                  <small>Your Movie Ticket</small>
                </Card.Header>

                <Card.Body className="p-4">
                  <Row>
                    {/* Movie Poster */}
                    <Col md={4} className="mb-3 mb-md-0">
                      {movie && (
                        <img
                          src={movie.imageUrl}
                          alt={movie.name}
                          className="img-fluid rounded shadow"
                          style={{
                            maxHeight: "250px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      )}
                    </Col>

                    {/* Ticket Details */}
                    <Col md={8}>
                      <h2 className="text-danger fw-bold mb-3">
                        {ticket.movieName}
                      </h2>

                      <Row className="mb-3">
                        <Col xs={6}>
                          <div className="mb-3">
                            <small className="text-muted d-block">
                              THEATRE
                            </small>
                            <span className="text-white fw-bold">
                              {ticket.theatreName}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="mb-3">
                            <small className="text-muted d-block">SCREEN</small>
                            <span className="text-white fw-bold">
                              {ticket.screenName}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col xs={6}>
                          <div className="mb-3">
                            <small className="text-muted d-block">
                              DATE & TIME
                            </small>
                            <span className="text-white fw-bold">
                              {new Date(ticket.showTime).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <br />
                            <span className="text-warning">
                              {new Date(ticket.showTime).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="mb-3">
                            <small className="text-muted d-block">SEATS</small>
                            <div>
                              {ticket.seats.map((seat, index) => (
                                <span
                                  key={index}
                                  className="badge bg-success me-1 mb-1 fs-6"
                                >
                                  {seat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={6}>
                          <div>
                            <small className="text-muted d-block">
                              BOOKING ID
                            </small>
                            <span className="text-white fw-bold font-monospace">
                              {ticket.ticketId}
                            </span>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div>
                            <small className="text-muted d-block">
                              AMOUNT PAID
                            </small>
                            <span className="text-success fw-bold fs-4">
                              ₹{ticket.amountPaid.toFixed(2)}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>

                {/* Ticket Footer - Barcode simulation */}
                <Card.Footer className="bg-white py-3">
                  <div className="text-center">
                    <div
                      className="d-inline-block mx-auto mb-2"
                      style={{
                        background: `repeating-linear-gradient(
                          90deg,
                          #000,
                          #000 2px,
                          #fff 2px,
                          #fff 4px
                        )`,
                        width: "200px",
                        height: "50px",
                      }}
                    />
                    <div className="text-dark small">
                      <strong>{ticket.ticketId}</strong>
                    </div>
                    <div className="text-muted small">
                      Booked on: {new Date(ticket.bookingDate).toLocaleString()}
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                variant="success"
                size="lg"
                onClick={handleDownloadTicket}
              >
                📥 Download Ticket
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => navigate("/movies")}
              >
                Book Another Movie
              </Button>
              <Button
                variant="outline-danger"
                size="lg"
                onClick={() => navigate("/")}
              >
                Go to Home
              </Button>
            </div>
          </Col>
        </Row>

        {/* Additional Info */}
        <Row className="justify-content-center mt-5">
          <Col lg={8}>
            <Card className="bg-secondary border-0">
              <Card.Body>
                <h5 className="text-white mb-3">📋 Important Information</h5>
                <ul className="text-muted mb-0 small">
                  <li className="mb-2">
                    Please arrive at least 15 minutes before the show time.
                  </li>
                  <li className="mb-2">
                    Carry a valid ID proof along with this ticket.
                  </li>
                  <li className="mb-2">
                    Outside food and beverages are not allowed inside the
                    theatre.
                  </li>
                  <li className="mb-2">
                    This ticket is non-transferable and non-refundable.
                  </li>
                  <li>
                    For any queries, contact support@icinema.com or call +1
                    (555) 123-4567
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default TicketPage;
