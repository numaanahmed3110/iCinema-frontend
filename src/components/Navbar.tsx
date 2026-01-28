import { Link, useLocation } from "react-router-dom";
import { Container, Navbar as BSNavbar, Nav } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();

  return (
    <BSNavbar
      expand="lg"
      fixed="top"
      className="py-3"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
    >
      <Container>
        <BSNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 d-flex align-items-center"
        >
          <span
            className="me-2 d-inline-flex align-items-center justify-content-center rounded-circle"
            style={{
              background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
              width: "40px",
              height: "40px",
              fontSize: "20px",
            }}
          >
            🎬
          </span>
          <span
            style={{
              background: "linear-gradient(90deg, #e50914 0%, #ff6b6b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            iCinema
          </span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" className="border-0">
          <span style={{ color: "#e50914", fontSize: "24px" }}>☰</span>
        </BSNavbar.Toggle>
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link
              as={Link}
              to="/"
              className="px-3 py-2 rounded-pill fw-semibold"
              style={{
                color:
                  location.pathname === "/" ? "#fff" : "rgba(255,255,255,0.7)",
                background:
                  location.pathname === "/"
                    ? "rgba(229,9,20,0.3)"
                    : "transparent",
                border:
                  location.pathname === "/"
                    ? "1px solid rgba(229,9,20,0.5)"
                    : "1px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/movies"
              className="px-3 py-2 rounded-pill fw-semibold"
              style={{
                color: location.pathname.startsWith("/movies")
                  ? "#fff"
                  : "rgba(255,255,255,0.7)",
                background: location.pathname.startsWith("/movies")
                  ? "rgba(229,9,20,0.3)"
                  : "transparent",
                border: location.pathname.startsWith("/movies")
                  ? "1px solid rgba(229,9,20,0.5)"
                  : "1px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              🎥 Movies
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
