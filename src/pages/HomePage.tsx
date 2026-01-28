import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Movie } from "../models/Movie";
import Navbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { buildUrl, API_CONFIG } from "../config";
import {
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  BUTTON_LABELS,
  SECTION_TITLES,
} from "../constants";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(buildUrl(API_CONFIG.ENDPOINTS.MOVIES.ALL))
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
        setError(ERROR_MESSAGES.MOVIES_FETCH);
        setMovies([]);
      });
  }, []);

  const tags = [
    { name: "Premieres", icon: "🌟", description: "First Day First Show" },
    { name: "IMAX", icon: "🎬", description: "Larger Than Life" },
    { name: "4DX", icon: "🎢", description: "Feel The Action" },
    { name: "Dolby Atmos", icon: "🔊", description: "Immersive Sound" },
    { name: "Blockbusters", icon: "💎", description: "Top Rated Movies" },
    { name: "Family", icon: "🎭", description: "Fun For Everyone" },
  ];

  const deals = [
    {
      title: "Credit Card Offer",
      description: "Get 10% OFF on all Credit Card payments!",
      icon: "💳",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      code: "CREDIT10",
      discount: "10% OFF",
    },
    {
      title: "Debit Card Discount",
      description: "Enjoy 5% discount with Debit Cards!",
      icon: "🏦",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      code: "DEBIT5",
      discount: "5% OFF",
    },
    {
      title: "Weekend Special",
      description: "Buy 2 tickets, get popcorn FREE!",
      icon: "🍿",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      code: "WEEKEND",
      discount: "FREE POPCORN",
    },
    {
      title: "First Booking",
      description: "Extra 15% OFF on your first booking!",
      icon: "🎁",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      code: "FIRST15",
      discount: "15% OFF",
    },
  ];

  const experiences = [
    {
      title: "IMAX Experience",
      description: "Crystal-clear images and heart-pounding audio.",
      icon: "🎥",
      gradient: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)",
    },
    {
      title: "4DX Motion",
      description: "Feel every moment with motion, wind & scent.",
      icon: "🎢",
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    },
    {
      title: "Dolby Cinema",
      description: "Spectacular image and sound technologies.",
      icon: "🔊",
      gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
    },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Carousel */}
      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "100vh",
            background: "linear-gradient(180deg, #000 0%, #1a1a2e 100%)",
          }}
        >
          <Spinner
            animation="border"
            variant="danger"
            style={{ width: "60px", height: "60px" }}
          />
          <p className="text-white mt-4 fs-5">Loading amazing movies...</p>
        </div>
      ) : error && movies.length === 0 ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "100vh",
            background: "linear-gradient(180deg, #000 0%, #1a1a2e 100%)",
          }}
        >
          <div className="text-center">
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎬</div>
            <h2 className="text-white mb-3">Welcome to iCinema</h2>
            <p className="text-secondary mb-4">
              Explore the latest blockbusters and book your seats!
            </p>
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate("/movies")}
            >
              Browse Movies
            </Button>
          </div>
        </div>
      ) : (
        <MovieCarousel movies={movies} />
      )}

      {/* Tags Section */}
      <div
        style={{
          background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Container>
          <Row className="g-3 justify-content-center">
            {tags.map((tag, index) => (
              <Col key={index} xs={6} sm={4} md={2}>
                <div
                  className="text-center p-4 rounded-4 h-100"
                  style={{
                    background:
                      "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "rgba(229,9,20,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 40px rgba(229,9,20,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                    {tag.icon}
                  </div>
                  <h6 className="text-white mb-1 fw-bold">{tag.name}</h6>
                  <small className="text-secondary">{tag.description}</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Now Showing Section */}
      <div
        style={{
          background: "#000",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2
                className="text-white fw-bold mb-1"
                style={{ fontSize: "2.5rem" }}
              >
                <span style={{ color: "#e50914" }}>Now</span> Showing
              </h2>
              <p className="text-secondary mb-0">
                Catch the latest movies in theatres
              </p>
            </div>
            <Button
              variant="outline-light"
              className="rounded-pill px-4"
              onClick={() => navigate("/movies")}
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              View All →
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p className="text-secondary mt-3">Loading movies...</p>
            </div>
          ) : error || movies.length === 0 ? (
            <Alert
              variant="dark"
              className="text-center py-5 rounded-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎬</div>
              <h5 className="text-white">No Movies Available</h5>
              <p className="text-secondary mb-3">
                We couldn't fetch movies at the moment. Please check back later.
              </p>
              <Button
                variant="outline-danger"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </Alert>
          ) : (
            <Row>
              {movies.slice(0, 4).map((movie) => (
                <Col key={movie.id} lg={3} md={4} sm={6} className="mb-4">
                  <MovieCard movie={movie} showDescription={true} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      {/* Deals & Exclusives */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a0a0a 0%, #0a0a1a 50%, #0a1a0a 100%)",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2
              className="text-white fw-bold mb-2"
              style={{ fontSize: "2.5rem" }}
            >
              <span style={{ color: "#e50914" }}>Deals</span> & Exclusives
            </h2>
            <p className="text-secondary">
              Grab these amazing offers before they're gone!
            </p>
          </div>
          <Row className="g-4">
            {deals.map((deal, index) => (
              <Col key={index} lg={3} md={6}>
                <Card
                  className="h-100 border-0 overflow-hidden"
                  style={{
                    background: deal.gradient,
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 60px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Body className="p-4 text-white d-flex flex-column">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "rgba(255,255,255,0.2)",
                        fontSize: "28px",
                      }}
                    >
                      {deal.icon}
                    </div>
                    <div
                      className="badge mb-2 align-self-start"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        fontSize: "12px",
                      }}
                    >
                      {deal.discount}
                    </div>
                    <Card.Title className="fw-bold mb-2">
                      {deal.title}
                    </Card.Title>
                    <Card.Text className="small opacity-75 flex-grow-1">
                      {deal.description}
                    </Card.Text>
                    <div
                      className="mt-3 p-2 rounded text-center"
                      style={{ background: "rgba(0,0,0,0.2)" }}
                    >
                      <small className="opacity-75">Use Code: </small>
                      <strong>{deal.code}</strong>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Theatre Experience Section */}
      <div
        style={{
          background: "#000",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2
              className="text-white fw-bold mb-2"
              style={{ fontSize: "2.5rem" }}
            >
              Premium <span style={{ color: "#e50914" }}>Experience</span>
            </h2>
            <p className="text-secondary">
              Discover the future of cinema technology
            </p>
          </div>
          <Row className="g-4">
            {experiences.map((exp, index) => (
              <Col key={index} lg={4} md={6}>
                <div
                  className="p-5 rounded-4 text-center h-100"
                  style={{
                    background: exp.gradient,
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(229,9,20,0.5)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>
                    {exp.icon}
                  </div>
                  <h4 className="text-white fw-bold mb-3">{exp.title}</h4>
                  <p className="text-secondary mb-4">{exp.description}</p>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill px-4"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    Learn More
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Quick Booking CTA */}
      <div
        className="py-5 position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #e50914 0%, #b20710 50%, #8b0000 100%)",
          minHeight: "400px",
        }}
      >
        {/* Decorative elements */}
        <div
          className="position-absolute"
          style={{
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: "-30%",
            left: "-5%",
            width: "300px",
            height: "300px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
          }}
        />

        <Container className="position-relative py-5">
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="mb-4 mb-lg-0">
                <span
                  className="badge mb-3 px-3 py-2"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    fontSize: "14px",
                  }}
                >
                  🎟️ LIMITED TIME OFFER
                </span>
                <h1
                  className="text-white fw-bold mb-3"
                  style={{ fontSize: "3rem", lineHeight: "1.2" }}
                >
                  Ready to Experience
                  <br />
                  Cinema Like Never Before?
                </h1>
                <p className="text-white opacity-75 fs-5 mb-4">
                  Book your tickets now and enjoy an unforgettable movie
                  experience with premium seats and exclusive deals!
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Button
                    variant="light"
                    size="lg"
                    className="fw-bold px-5 rounded-pill"
                    onClick={() => navigate("/movies")}
                    style={{ color: "#e50914" }}
                  >
                    Book Now 🎬
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="px-4 rounded-pill"
                  >
                    View Offers
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={5} className="text-center d-none d-lg-block">
              <div style={{ fontSize: "150px" }}>🎬</div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
