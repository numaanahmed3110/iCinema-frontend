import { Form, Button } from "react-bootstrap";

interface MovieFilterBarProps {
  genres: string[];
  languages: string[];
  selectedGenre: string;
  selectedLanguage: string;
  selectedRating: string;
  onGenreChange: (genre: string) => void;
  onLanguageChange: (language: string) => void;
  onRatingChange: (rating: string) => void;
  onClearFilters: () => void;
}

const MovieFilterBar = ({
  genres,
  languages,
  selectedGenre,
  selectedLanguage,
  selectedRating,
  onGenreChange,
  onLanguageChange,
  onRatingChange,
  onClearFilters,
}: MovieFilterBarProps) => {
  const ratings = ["1", "2", "3", "4", "5"];

  const sectionStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    fontSize: "14px",
  };

  const hasActiveFilters = selectedGenre || selectedLanguage || selectedRating;

  return (
    <div
      className="p-4 rounded-4"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: "100px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-white fw-bold mb-0">
          <span style={{ marginRight: "8px" }}>🎚️</span>
          Filters
        </h5>
        {hasActiveFilters && (
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none"
            onClick={onClearFilters}
            style={{ color: "#e50914" }}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Genre Section */}
      <div style={sectionStyle}>
        <h6
          className="text-white mb-3 fw-semibold"
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Genre
        </h6>
        <Form>
          <Form.Check
            type="radio"
            id="genre-all"
            label={<span style={labelStyle}>All Genres</span>}
            name="genre"
            checked={selectedGenre === ""}
            onChange={() => onGenreChange("")}
            className="mb-2"
          />
          {genres.map((genre) => (
            <Form.Check
              key={genre}
              type="radio"
              id={`genre-${genre}`}
              label={<span style={labelStyle}>{genre}</span>}
              name="genre"
              checked={selectedGenre === genre}
              onChange={() => onGenreChange(genre)}
              className="mb-2"
            />
          ))}
        </Form>
      </div>

      {/* Language Section */}
      <div style={sectionStyle}>
        <h6
          className="text-white mb-3 fw-semibold"
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Language
        </h6>
        <Form>
          <Form.Check
            type="radio"
            id="language-all"
            label={<span style={labelStyle}>All Languages</span>}
            name="language"
            checked={selectedLanguage === ""}
            onChange={() => onLanguageChange("")}
            className="mb-2"
          />
          {languages.map((language) => (
            <Form.Check
              key={language}
              type="radio"
              id={`language-${language}`}
              label={<span style={labelStyle}>{language}</span>}
              name="language"
              checked={selectedLanguage === language}
              onChange={() => onLanguageChange(language)}
              className="mb-2"
            />
          ))}
        </Form>
      </div>

      {/* Rating Section */}
      <div style={{ ...sectionStyle, marginBottom: 0 }}>
        <h6
          className="text-white mb-3 fw-semibold"
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Rating
        </h6>
        <Form>
          <Form.Check
            type="radio"
            id="rating-all"
            label={<span style={labelStyle}>All Ratings</span>}
            name="rating"
            checked={selectedRating === ""}
            onChange={() => onRatingChange("")}
            className="mb-2"
          />
          {ratings.map((rating) => (
            <Form.Check
              key={rating}
              type="radio"
              id={`rating-${rating}`}
              label={
                <span style={labelStyle}>
                  {rating}+ <span style={{ color: "#ffd700" }}>★</span>
                </span>
              }
              name="rating"
              checked={selectedRating === rating}
              onChange={() => onRatingChange(rating)}
              className="mb-2"
            />
          ))}
        </Form>
      </div>
    </div>
  );
};

export default MovieFilterBar;
