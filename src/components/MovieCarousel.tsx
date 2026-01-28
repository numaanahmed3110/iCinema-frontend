import { Carousel, Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Movie } from "../models/Movie";

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  const navigate = useNavigate();

  if (movies.length === 0) {
    return null;
  }

  return (
    <Carousel
      indicators={true}
      controls={true}
      interval={5000}
      fade
      style={{ marginTop: "-80px" }}
    >
      {movies.slice(0, 5).map((movie) => (
        <Carousel.Item key={movie.id}>
          <div
            style={{
              height: "100vh",
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%),
                url(${movie.imageUrl || "https://via.placeholder.com/1920x1080?text=No+Image"})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container>
              <div
                className="text-white"
                style={{ maxWidth: "650px", paddingTop: "80px" }}
              >
                {/* Now Showing Badge */}
                <Badge
                  className="mb-3 px-3 py-2"
                  style={{
                    background: "rgba(229,9,20,0.9)",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                >
                  🎬 NOW SHOWING
                </Badge>

                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: "1.1",
                    textShadow: "2px 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  {movie.name}
                </h1>

                {/* Movie Info Pills */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <span
                    className="d-flex align-items-center px-3 py-2 rounded-pill"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span style={{ color: "#ffd700", marginRight: "6px" }}>
                      ★
                    </span>
                    <span className="fw-semibold">
                      {movie.averageRating?.toFixed(1) || "N/A"}
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        marginLeft: "4px",
                      }}
                    >
                      /5
                    </span>
                  </span>
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: "rgba(229,9,20,0.3)",
                      color: "#ff6b6b",
                    }}
                  >
                    {movie.genre}
                  </span>
                  <span
                    className="px-3 py-2 rounded-pill"
                    style={{ background: "rgba(255,255,255,0.1)" }}
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
                </div>

                <p
                  className="mb-4"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "rgba(255,255,255,0.8)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                  }}
                >
                  {movie.description}
                </p>

                <div className="d-flex gap-3 flex-wrap">
                  <Button
                    size="lg"
                    className="px-5 py-3 fw-bold rounded-pill"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    style={{
                      background:
                        "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                      border: "none",
                      boxShadow: "0 10px 30px rgba(229,9,20,0.4)",
                    }}
                  >
                    Book Tickets 🎟️
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    className="px-4 py-3 rounded-pill"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
