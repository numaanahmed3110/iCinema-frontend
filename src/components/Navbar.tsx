import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar as BSNavbar, Nav, Button } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check login status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.email || "User");
      } catch {
        setUserName("User");
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

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
          {/* Center Navigation Links */}
          <Nav className="mx-auto gap-4 align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="px-2 py-2 position-relative"
              style={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "15px",
                letterSpacing: "0.3px",
                transition: "all 0.3s ease",
                background: "transparent",
                border: "none",
              }}
            >
              Home
              {location.pathname === "/" && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    background: "#e50914",
                    borderRadius: "2px",
                  }}
                />
              )}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/movies"
              className="px-2 py-2 position-relative"
              style={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "15px",
                letterSpacing: "0.3px",
                transition: "all 0.3s ease",
                background: "transparent",
                border: "none",
              }}
            >
              Movies
              {location.pathname.startsWith("/movies") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "2px",
                    background: "#e50914",
                    borderRadius: "2px",
                  }}
                />
              )}
            </Nav.Link>

            {/* Bookings Link - Only show when logged in */}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/bookings"
                className="px-2 py-2 position-relative"
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "15px",
                  letterSpacing: "0.3px",
                  transition: "all 0.3s ease",
                  background: "transparent",
                  border: "none",
                }}
              >
                Bookings
                {location.pathname === "/bookings" && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "2px",
                      background: "#e50914",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </Nav.Link>
            )}
          </Nav>

          {/* Right Side - Auth */}
          <Nav className="gap-2 align-items-center">
            {/* Auth Buttons */}
            {isLoggedIn ? (
              <>
                <span
                  className="px-3 py-2"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                  }}
                >
                  {userName}
                </span>
                <Button
                  variant="outline-light"
                  className="px-3 py-2 rounded-pill fw-semibold"
                  onClick={handleLogout}
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="px-3 py-2"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign In
                </Nav.Link>
                <Button
                  as={Link as any}
                  to="/signup"
                  className="px-4 py-2 rounded-pill fw-semibold border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
