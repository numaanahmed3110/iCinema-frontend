import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Movie } from "../models/Movie";
import { Theatre } from "../models/Theatre";
import { Show } from "../models/Show";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { buildUrl, API_CONFIG, APP_CONFIG } from "../config";
import {
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  EMPTY_MESSAGES,
  INFO_MESSAGES,
  BUTTON_LABELS,
} from "../constants";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTheatres, setLoadingTheatres] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theatreError, setTheatreError] = useState<string | null>(null);

  // Rating
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Booking Modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMovieDetails = () => {
    setLoading(true);
    setError(null);

    axios
      .get(buildUrl(API_CONFIG.ENDPOINTS.MOVIES.BY_ID(id || "")))
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
        fetchTheatresAndShows();
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        setError(ERROR_MESSAGES.MOVIE_DETAILS_FETCH);
        setLoading(false);
      });
  };

  const fetchTheatresAndShows = () => {
    setLoadingTheatres(true);
    setTheatreError(null);

    axios
      .get(buildUrl(API_CONFIG.ENDPOINTS.SEATING.BY_MOVIE(id || "")))
      .then((res) => {
        setTheatres(res.data);
        setLoadingTheatres(false);
      })
      .catch((err) => {
        console.error("Error fetching theatres:", err);
        setTheatreError(ERROR_MESSAGES.SHOWS_FETCH);
        setTheatres([]);
        setLoadingTheatres(false);
      });
  };

  const handleRatingSubmit = () => {
    axios
      .post(buildUrl(API_CONFIG.ENDPOINTS.RATING.RATE), {
        movieId: id,
        userId: 1,
        stars: userRating,
      })
      .then(() => {
        setRatingSubmitted(true);
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        setRatingSubmitted(true);
      });
  };

  const handleShowSelect = (show: Show) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not logged in
      navigate("/login");
      return;
    }

    setSelectedShow(show);
    setShowBookingModal(true);
  };

  const handleProceedToSeats = () => {
    if (selectedShow) {
      navigate(`/seats/${selectedShow.id}`, {
        state: {
          movie,
          show: selectedShow,
          theatre: theatres.find((t) => t.id === selectedShow.theatreId),
          ticketCount,
        },
      });
    }
  };

  const formatShowTime = (showTime: string) => {
    return new Date(showTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Loading State
  if (loading) {
    return (
      <div style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <Spinner
            animation="border"
            variant="danger"
            style={{ width: "60px", height: "60px" }}
          />
          <p className="mt-4" style={{ color: "rgba(255,255,255,0.7)" }}>
            {LOADING_MESSAGES.MOVIE_DETAILS}
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !movie) {
    return (
      <div style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <Container className="py-5">
          <div
            className="text-center py-5 rounded-4 mx-auto"
            style={{
              background: "rgba(229,9,20,0.1)",
              border: "1px solid rgba(229,9,20,0.3)",
              maxWidth: "500px",
            }}
          >
            <div style={{ fontSize: "70px", marginBottom: "20px" }}>🎬</div>
            <h3 className="text-white mb-3">
              {error || ERROR_MESSAGES.MOVIE_NOT_FOUND}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }} className="mb-4">
              The movie you're looking for might have been removed or is
              temporarily unavailable.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Button
                variant="danger"
                onClick={fetchMovieDetails}
                className="rounded-pill px-4"
              >
                {BUTTON_LABELS.TRY_AGAIN}
              </Button>
              <Button
                variant="outline-light"
                onClick={() => navigate("/movies")}
                className="rounded-pill px-4"
              >
                {BUTTON_LABELS.BACK_TO_MOVIES}
              </Button>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Movie Hero Section */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 100%),
            url(${movie.imageUrl})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "600px",
          marginTop: "-80px",
          paddingTop: "80px",
        }}
      >
        <Container className="py-5">
          <Row
            className="align-items-center g-5"
            style={{ minHeight: "500px" }}
          >
            {/* Movie Poster */}
            <Col lg={4} md={5}>
              <div
                className="position-relative"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.name}
                  className="img-fluid w-100"
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                />
                {/* Rating Overlay */}
                <div
                  className="position-absolute d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    top: "15px",
                    right: "15px",
                    background: "rgba(0,0,0,0.8)",
                    borderRadius: "30px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span style={{ color: "#ffd700", fontSize: "18px" }}>★</span>
                  <span className="text-white fw-bold">
                    {movie.averageRating?.toFixed(1) || "N/A"}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>/5</span>
                </div>
              </div>
            </Col>

            {/* Movie Details */}
            <Col lg={8} md={7}>
              <div style={{ maxWidth: "700px" }}>
                {/* Badges */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Badge
                    className="px-3 py-2"
                    style={{
                      background: "rgba(229,9,20,0.9)",
                      fontSize: "12px",
                    }}
                  >
                    🎬 IN CINEMAS NOW
                  </Badge>
                </div>

                {/* Title */}
                <h1
                  className="text-white fw-bold mb-4"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    lineHeight: "1.1",
                  }}
                >
                  {movie.name}
                </h1>

                {/* Info Pills */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "rgba(229,9,20,0.2)",
                      color: "#ff6b6b",
                    }}
                  >
                    {movie.genre}
                  </span>
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                    }}
                  >
                    {movie.language}
                  </span>
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background:
                        movie.censorRating === "A"
                          ? "rgba(255,0,0,0.2)"
                          : "rgba(0,255,0,0.2)",
                      color: movie.censorRating === "A" ? "#ff6b6b" : "#6bff6b",
                    }}
                  >
                    {movie.censorRating}
                  </span>
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    📅{" "}
                    {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="mb-4"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                  }}
                >
                  {movie.description}
                </p>

                {/* CTA Buttons */}
                <div className="d-flex gap-3 mb-5">
                  <Button
                    size="lg"
                    className="px-5 py-3 fw-bold rounded-pill"
                    style={{
                      background:
                        "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                      border: "none",
                      boxShadow: "0 10px 30px rgba(229,9,20,0.4)",
                    }}
                    onClick={() => {
                      document
                        .getElementById("shows-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {BUTTON_LABELS.BOOK_NOW} 🎟️
                  </Button>
                </div>

                {/* Rating Section */}
                <div
                  className="p-4 rounded-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    maxWidth: "350px",
                  }}
                >
                  <h6 className="text-white fw-bold mb-3">Rate this Movie</h6>
                  {ratingSubmitted ? (
                    <div
                      className="p-3 rounded-3 text-center"
                      style={{ background: "rgba(40,167,69,0.2)" }}
                    >
                      <p className="text-success mb-0">
                        ✓ {SUCCESS_MESSAGES.RATING_SUBMITTED} You gave{" "}
                        {userRating} ⭐
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className="me-2"
                            style={{
                              cursor: "pointer",
                              fontSize: "32px",
                              transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setUserRating(star)}
                          >
                            {star <= (hoverRating || userRating) ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill px-4"
                        disabled={userRating === 0}
                        onClick={handleRatingSubmit}
                      >
                        {BUTTON_LABELS.SUBMIT_RATING}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Shows Section */}
      <div
        id="shows-section"
        style={{
          background: "#000",
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        <Container>
          <div className="mb-5">
            <h2
              className="text-white fw-bold mb-2"
              style={{ fontSize: "2rem" }}
            >
              <span style={{ color: "#e50914" }}>Select</span> Show
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Choose your preferred theatre and showtime
            </p>
          </div>

          {loadingTheatres ? (
            <div
              className="text-center py-5 rounded-4"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <Spinner
                animation="border"
                variant="danger"
                style={{ width: "50px", height: "50px" }}
              />
              <p className="mt-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                {LOADING_MESSAGES.SHOWS}
              </p>
            </div>
          ) : theatreError ? (
            <Alert
              variant="dark"
              className="text-center py-5 rounded-4"
              style={{
                background: "rgba(229,9,20,0.1)",
                border: "1px solid rgba(229,9,20,0.3)",
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎭</div>
              <h5 className="text-white">{theatreError}</h5>
              <p style={{ color: "rgba(255,255,255,0.6)" }} className="mb-3">
                Unable to load available shows at this time.
              </p>
              <Button
                variant="outline-danger"
                onClick={fetchTheatresAndShows}
                className="rounded-pill px-4"
              >
                {BUTTON_LABELS.TRY_AGAIN}
              </Button>
            </Alert>
          ) : theatres.length > 0 ? (
            <div className="d-flex flex-column gap-4">
              {theatres.map((theatre) => (
                <Card
                  key={theatre.id}
                  className="border-0"
                  style={{
                    background:
                      "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <Card.Body className="p-4">
                    <Row className="align-items-center g-4">
                      <Col lg={4} md={12}>
                        <div className="d-flex align-items-start gap-3">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              background: "rgba(229,9,20,0.2)",
                              fontSize: "24px",
                            }}
                          >
                            🏛️
                          </div>
                          <div>
                            <h5 className="text-white fw-bold mb-1">
                              {theatre.name}
                            </h5>
                            <p
                              className="mb-0"
                              style={{
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "14px",
                              }}
                            >
                              📍 {theatre.location}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col lg={8} md={12}>
                        <div className="d-flex flex-wrap gap-2">
                          {theatre.shows.map((show) => (
                            <Button
                              key={show.id}
                              variant="outline-light"
                              className="position-relative px-4 py-3"
                              style={{
                                borderColor: "rgba(255,255,255,0.2)",
                                borderRadius: "12px",
                                minWidth: "120px",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#e50914";
                                e.currentTarget.style.background =
                                  "rgba(229,9,20,0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "rgba(255,255,255,0.2)";
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                              onClick={() => handleShowSelect(show)}
                            >
                              <div
                                className="text-white fw-semibold"
                                style={{ fontSize: "15px" }}
                              >
                                {formatShowTime(show.showTime)}
                              </div>
                              <div
                                style={{
                                  color: "#4ade80",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                ₹{show.price}
                              </div>
                              {show.screenName && (
                                <div
                                  className="mt-1 px-2 py-1 rounded"
                                  style={{
                                    background: "rgba(255,255,255,0.1)",
                                    fontSize: "11px",
                                    color: "rgba(255,255,255,0.7)",
                                  }}
                                >
                                  {show.screenName}
                                </div>
                              )}
                            </Button>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              variant="dark"
              className="text-center py-5 rounded-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎬</div>
              <h5 className="text-white">{EMPTY_MESSAGES.NO_SHOWS}</h5>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>
                Check back later for available showtimes.
              </p>
            </Alert>
          )}
        </Container>
      </div>

      {/* Ticket Count Modal */}
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        centered
        size="sm"
      >
        <div
          style={{
            background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Modal.Header
            closeButton
            className="border-0 pb-0"
            closeVariant="white"
            style={{ background: "transparent" }}
          >
            <Modal.Title className="text-white fw-bold">
              How many tickets?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-3">
            {selectedShow && (
              <>
                <div
                  className="p-3 rounded-3 mb-4"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <p className="text-white mb-2 fw-semibold">{movie.name}</p>
                  <p
                    className="mb-1"
                    style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
                  >
                    🕐 {formatShowTime(selectedShow.showTime)}
                  </p>
                  <p
                    className="mb-0"
                    style={{ color: "#4ade80", fontSize: "14px" }}
                  >
                    💰 ₹{selectedShow.price} per ticket
                  </p>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white mb-3">
                    Number of Tickets
                  </Form.Label>
                  <div className="d-flex align-items-center justify-content-center gap-4">
                    <Button
                      variant="outline-danger"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "45px", height: "45px" }}
                      onClick={() =>
                        setTicketCount(Math.max(1, ticketCount - 1))
                      }
                    >
                      −
                    </Button>
                    <span
                      className="text-white fw-bold"
                      style={{
                        fontSize: "2rem",
                        minWidth: "50px",
                        textAlign: "center",
                      }}
                    >
                      {ticketCount}
                    </span>
                    <Button
                      variant="outline-danger"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "45px", height: "45px" }}
                      onClick={() =>
                        setTicketCount(
                          Math.min(
                            APP_CONFIG.MAX_TICKETS_PER_BOOKING,
                            ticketCount + 1,
                          ),
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  <small
                    className="d-block text-center mt-2"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {INFO_MESSAGES.MAX_TICKETS}
                  </small>
                </Form.Group>

                <div
                  className="p-3 rounded-3 d-flex justify-content-between align-items-center"
                  style={{ background: "rgba(229,9,20,0.1)" }}
                >
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    Estimated Total
                  </span>
                  <span
                    className="fw-bold"
                    style={{ color: "#4ade80", fontSize: "1.3rem" }}
                  >
                    ₹{selectedShow.price * ticketCount}
                  </span>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              variant="outline-secondary"
              onClick={() => setShowBookingModal(false)}
              className="rounded-pill px-4"
            >
              {BUTTON_LABELS.CANCEL}
            </Button>
            <Button
              className="rounded-pill px-4 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                border: "none",
              }}
              onClick={handleProceedToSeats}
            >
              {BUTTON_LABELS.SELECT_SEATS}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default MovieDetailsPage;
