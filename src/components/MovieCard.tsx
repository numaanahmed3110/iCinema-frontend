import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
  showDescription?: boolean;
}

const MovieCard = ({ movie, showDescription = false }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card
      className="h-100 border-0 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(229,9,20,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={handleViewDetails}
    >
      {/* Image Container with Overlay */}
      <div
        className="position-relative"
        style={{ height: "320px", overflow: "hidden" }}
      >
        <Card.Img
          variant="top"
          src={
            movie.imageUrl ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.name}
          style={{
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="position-absolute w-100"
          style={{
            bottom: 0,
            left: 0,
            height: "50%",
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          }}
        />
        {/* Rating Badge */}
        <div
          className="position-absolute d-flex align-items-center gap-1 px-2 py-1 rounded"
          style={{
            top: "12px",
            right: "12px",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span style={{ color: "#ffd700", fontSize: "14px" }}>★</span>
          <span className="text-white fw-bold" style={{ fontSize: "14px" }}>
            {movie.averageRating?.toFixed(1) || "N/A"}
          </span>
        </div>
        {/* Censor Badge */}
        <Badge
          className="position-absolute"
          style={{
            top: "12px",
            left: "12px",
            background: movie.censorRating === "A" ? "#e50914" : "#2d7d32",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          {movie.censorRating}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <Card.Title
          className="text-white fw-bold mb-2 text-truncate"
          style={{ fontSize: "16px" }}
        >
          {movie.name}
        </Card.Title>

        <div className="d-flex flex-wrap gap-1 mb-2">
          <span
            className="px-2 py-1 rounded-pill"
            style={{
              background: "rgba(229,9,20,0.2)",
              color: "#e50914",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            {movie.genre}
          </span>
          <span
            className="px-2 py-1 rounded-pill"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "11px",
              fontWeight: "500",
            }}
          >
            {movie.language}
          </span>
        </div>

        {showDescription && movie.description && (
          <Card.Text
            className="flex-grow-1 mb-3"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              lineHeight: "1.5",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {movie.description}
          </Card.Text>
        )}

        <Button
          variant="danger"
          size="sm"
          className="mt-auto w-100 rounded-pill fw-semibold"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          style={{
            background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
            border: "none",
            padding: "10px",
          }}
        >
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
