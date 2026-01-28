import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Pagination,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { Movie } from "../models/Movie";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import MovieFilterBar from "../components/MovieFilterBar";
import Footer from "../components/Footer";
import { buildUrl, API_CONFIG, APP_CONFIG } from "../config";
import {
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  EMPTY_MESSAGES,
  BUTTON_LABELS,
  INFO_MESSAGES,
} from "../constants";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = APP_CONFIG.MOVIES_PER_PAGE;

  // Unique filter options
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    setError(null);
    axios
      .get(buildUrl(API_CONFIG.ENDPOINTS.MOVIES.ALL))
      .then((res) => {
        const data = res.data;
        setMovies(data);
        setFilteredMovies(data);
        extractFilterOptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setError(ERROR_MESSAGES.MOVIES_FETCH);
        setMovies([]);
        setFilteredMovies([]);
        setLoading(false);
      });
  };

  const extractFilterOptions = (movieList: Movie[]) => {
    const uniqueGenres = Array.from(new Set(movieList.map((m) => m.genre)));
    const uniqueLanguages = Array.from(
      new Set(movieList.map((m) => m.language)),
    );
    setGenres(uniqueGenres);
    setLanguages(uniqueLanguages);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedGenre, selectedLanguage, selectedRating, movies]);

  const applyFilters = () => {
    let result = [...movies];

    // Search filter
    if (searchTerm) {
      result = result.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Genre filter
    if (selectedGenre) {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // Language filter
    if (selectedLanguage) {
      result = result.filter((movie) => movie.language === selectedLanguage);
    }

    // Rating filter
    if (selectedRating) {
      result = result.filter(
        (movie) => movie.averageRating >= parseInt(selectedRating),
      );
    }

    setFilteredMovies(result);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length >= 2) {
      axios
        .get(buildUrl(`${API_CONFIG.ENDPOINTS.MOVIES.SEARCH}?name=${term}`))
        .then((res) => {
          setFilteredMovies(res.data);
        })
        .catch(() => {
          applyFilters();
        });
    }
  };

  const handleClearFilters = () => {
    setSelectedGenre("");
    setSelectedLanguage("");
    setSelectedRating("");
    setSearchTerm("");
    setFilteredMovies(movies);
  };

  // Pagination calculations
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const renderPagination = () => {
    const items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    items.push(
      <Pagination.First
        key="first"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />,
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      />,
    );

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>,
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      />,
    );
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />,
    );

    return items;
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Header Section */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(229,9,20,0.15) 0%, #000 100%)",
          paddingTop: "120px",
          paddingBottom: "40px",
        }}
      >
        <Container>
          <h1
            className="text-white fw-bold mb-2"
            style={{ fontSize: "2.5rem" }}
          >
            <span style={{ color: "#e50914" }}>Explore</span> Movies
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Discover the latest blockbusters and timeless classics
          </p>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} md={4} className="mb-4">
            <MovieFilterBar
              genres={genres}
              languages={languages}
              selectedGenre={selectedGenre}
              selectedLanguage={selectedLanguage}
              selectedRating={selectedRating}
              onGenreChange={setSelectedGenre}
              onLanguageChange={setSelectedLanguage}
              onRatingChange={setSelectedRating}
              onClearFilters={handleClearFilters}
            />
          </Col>

          {/* Movies Grid */}
          <Col lg={9} md={8}>
            {/* Search Bar */}
            <InputGroup className="mb-4">
              <InputGroup.Text
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRight: "none",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                🔍
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search movies by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderLeft: "none",
                  color: "#fff",
                  boxShadow: "none",
                }}
              />
            </InputGroup>

            {/* Results Info */}
            {!loading && !error && movies.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="mb-0" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Showing{" "}
                  <span className="text-white fw-semibold">
                    {indexOfFirstMovie + 1}-
                    {Math.min(indexOfLastMovie, filteredMovies.length)}
                  </span>{" "}
                  of{" "}
                  <span className="text-white fw-semibold">
                    {filteredMovies.length}
                  </span>{" "}
                  movies
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
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
                  Loading movies...
                </p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <Alert
                variant="dark"
                className="text-center py-5 rounded-4"
                style={{
                  background: "rgba(229,9,20,0.1)",
                  border: "1px solid rgba(229,9,20,0.3)",
                }}
              >
                <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎬</div>
                <h4 className="text-white mb-3">Unable to Load Movies</h4>
                <p style={{ color: "rgba(255,255,255,0.6)" }} className="mb-4">
                  {error}
                </p>
                <Button
                  variant="danger"
                  onClick={fetchMovies}
                  className="rounded-pill px-4"
                >
                  Try Again
                </Button>
              </Alert>
            )}

            {/* Movies Grid */}
            {!loading && !error && currentMovies.length > 0 && (
              <>
                <Row className="g-4">
                  {currentMovies.map((movie) => (
                    <Col key={movie.id} xl={3} lg={4} md={6} className="mb-2">
                      <MovieCard movie={movie} showDescription={true} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination>{renderPagination()}</Pagination>
                  </div>
                )}
              </>
            )}

            {/* Empty State (after filters) */}
            {!loading &&
              !error &&
              movies.length > 0 &&
              currentMovies.length === 0 && (
                <div
                  className="text-center py-5 rounded-4"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>
                    🔍
                  </div>
                  <h4 className="text-white mb-2">No Movies Found</h4>
                  <p
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    className="mb-4"
                  >
                    Try adjusting your filters or search term
                  </p>
                  <Button
                    variant="outline-danger"
                    onClick={handleClearFilters}
                    className="rounded-pill px-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

            {/* Empty State (no movies at all) */}
            {!loading && !error && movies.length === 0 && (
              <div
                className="text-center py-5 rounded-4"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎥</div>
                <h4 className="text-white mb-2">No Movies Available</h4>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>
                  Check back later for new releases
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default MoviesPage;
