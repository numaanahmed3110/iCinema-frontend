import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkStyle = {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #000 100%)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Main Footer Content */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Logo and Description */}
          <Col lg={4} md={6}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "45px",
                    height: "45px",
                    background:
                      "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>🎬</span>
                </div>
                <h3 className="mb-0 fw-bold">
                  <span style={{ color: "#e50914" }}>i</span>
                  <span className="text-white">Cinema</span>
                </h3>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                Your ultimate destination for movie ticket booking. Experience
                the magic of cinema with seamless booking, exclusive deals, and
                the best seats in the house.
              </p>
              <div className="d-flex gap-3 mt-4">
                {["📘", "🐦", "📷", "📺"].map((icon, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="d-flex align-items-center justify-content-center rounded-circle border-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(255,255,255,0.1)",
                      fontSize: "18px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(229,9,20,0.3)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={6}>
            <h6
              className="text-white fw-bold mb-4 text-uppercase"
              style={{ letterSpacing: "1px" }}
            >
              Quick Links
            </h6>
            <ul className="list-unstyled">
              {[
                { to: "/", label: "Home" },
                { to: "/movies", label: "Movies" },
                { to: "#", label: "Coming Soon" },
                { to: "#", label: "Offers" },
              ].map((link, idx) => (
                <li key={idx} className="mb-3">
                  <Link
                    to={link.to}
                    style={linkStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e50914")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Help & Support */}
          <Col lg={2} md={6} sm={6}>
            <h6
              className="text-white fw-bold mb-4 text-uppercase"
              style={{ letterSpacing: "1px" }}
            >
              Support
            </h6>
            <ul className="list-unstyled">
              {["FAQs", "Terms of Service", "Privacy Policy", "Contact Us"].map(
                (item, idx) => (
                  <li key={idx} className="mb-3">
                    <button
                      type="button"
                      className="border-0 bg-transparent p-0"
                      style={linkStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#e50914")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                      }
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </Col>

          {/* Connect With Us */}
          <Col lg={4} md={6}>
            <h6
              className="text-white fw-bold mb-4 text-uppercase"
              style={{ letterSpacing: "1px" }}
            >
              Contact Us
            </h6>
            <div className="mb-4">
              {[
                { icon: "📍", text: "123 Cinema Street, Movie City, MC 12345" },
                { icon: "📞", text: "+1 (555) 123-4567" },
                { icon: "✉️", text: "support@icinema.com" },
                { icon: "🕐", text: "24/7 Customer Support" },
              ].map((item, idx) => (
                <p
                  key={idx}
                  className="d-flex align-items-start mb-3"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <span className="me-3" style={{ fontSize: "18px" }}>
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-pill px-4"
            >
              Get Help
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container className="py-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p
                className="mb-0"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}
              >
                © {new Date().getFullYear()} iCinema. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p
                className="mb-0"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}
              >
                Made with <span style={{ color: "#e50914" }}>❤️</span> for movie
                lovers
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
