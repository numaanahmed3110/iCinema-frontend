import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { buildUrl } from "../config";

// Simple Booking interface matching API response
interface Booking {
  bookingId: number;
  movieName: string;
  showTime: string;
  totalAmount: number;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(buildUrl("/api/booking/history"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError("Failed to load bookings. Please try again.");
        }
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column position-relative"
      style={{
        background: "#0a0a0f",
        overflow: "hidden",
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(229, 9, 20, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Navbar />

      <Container
        className="flex-grow-1 py-5"
        style={{ marginTop: "80px", position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "8px",
              letterSpacing: "-0.5px",
            }}
          >
            My Bookings
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.5)",
              margin: 0,
            }}
          >
            Your movie ticket history
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <Spinner
              animation="border"
              style={{ color: "#e50914", width: "40px", height: "40px" }}
            />
            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "16px" }}>
              Loading your bookings...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Alert
            variant="danger"
            className="border-0 text-center"
            style={{
              background: "rgba(229, 9, 20, 0.15)",
              color: "#ff6b6b",
              borderRadius: "12px",
            }}
          >
            {error}
          </Alert>
        )}

        {/* No Bookings */}
        {!loading && !error && bookings.length === 0 && (
          <div
            className="text-center py-5"
            style={{
              background: "rgba(15, 15, 25, 0.6)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "60px 40px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎬</div>
            <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "8px" }}>
              No Bookings Yet
            </h4>
            <p
              style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}
            >
              You haven't booked any movies yet.
            </p>
            <Button
              onClick={() => navigate("/movies")}
              className="border-0 px-4 py-2"
              style={{
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              Browse Movies
            </Button>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && bookings.length > 0 && (
          <Row className="g-3">
            {bookings.map((booking) => (
              <Col key={booking.bookingId} xs={12} md={6} lg={4}>
                <div
                  style={{
                    background: "rgba(15, 15, 25, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    padding: "24px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.border =
                      "1px solid rgba(229, 9, 20, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.border =
                      "1px solid rgba(255, 255, 255, 0.06)";
                  }}
                >
                  {/* Booking ID Badge */}
                  <div
                    className="d-inline-block mb-3"
                    style={{
                      background: "rgba(229, 9, 20, 0.15)",
                      color: "#e50914",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    #{booking.bookingId}
                  </div>

                  {/* Movie Name */}
                  <h5
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "18px",
                      marginBottom: "16px",
                      lineHeight: 1.3,
                    }}
                  >
                    {booking.movieName}
                  </h5>

                  {/* Show Time */}
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <span style={{ marginRight: "8px", fontSize: "14px" }}>
                      🕐
                    </span>
                    <span style={{ fontSize: "14px" }}>{booking.showTime}</span>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255,255,255,0.08)",
                      margin: "16px 0",
                    }}
                  />

                  {/* Total Amount */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "13px",
                      }}
                    >
                      Total Paid
                    </span>
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "20px",
                      }}
                    >
                      ₹{booking.totalAmount}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default BookingsPage;
