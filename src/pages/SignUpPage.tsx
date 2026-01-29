import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { buildUrl } from "../config";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(buildUrl("/api/auth/signup"), {
        name,
        email,
        password,
      });

      navigate("/login", {
        state: { message: "Account created successfully! Please sign in." },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Sign up failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    color: "#fff",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "12px",
    fontWeight: 500 as const,
    marginBottom: "8px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(229, 9, 20, 0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(229, 9, 20, 0.1)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
    e.target.style.boxShadow = "none";
  };

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
          top: "10%",
          right: "-15%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-15%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Navbar />

      <Container
        className="flex-grow-1 d-flex align-items-center justify-content-center py-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: "480px",
            width: "100%",
            padding: "40px 36px",
            background: "rgba(15, 15, 25, 0.8)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                borderRadius: "14px",
                fontSize: "24px",
                boxShadow: "0 8px 32px rgba(229, 9, 20, 0.35)",
              }}
            >
              🎬
            </div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "6px",
                letterSpacing: "-0.5px",
              }}
            >
              Create your account
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.45)",
                margin: 0,
              }}
            >
              Start your cinematic journey today
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              variant="danger"
              className="mb-4 border-0"
              style={{
                background: "rgba(229, 9, 20, 0.15)",
                color: "#ff6b6b",
                borderRadius: "12px",
                fontSize: "14px",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Sign Up Form */}
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Row className="g-3 mb-4">
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label style={labelStyle}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label style={labelStyle}>Confirm</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="w-100 border-0"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.3px",
                boxShadow: "0 8px 24px rgba(229, 9, 20, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(229, 9, 20, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(229, 9, 20, 0.3)";
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>

          {/* Terms */}
          <p
            className="text-center mt-4 mb-3"
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.35)",
              lineHeight: 1.6,
            }}
          >
            By signing up, you agree to our{" "}
            <span
              style={{ color: "rgba(255, 255, 255, 0.6)", cursor: "pointer" }}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              style={{ color: "rgba(255, 255, 255, 0.6)", cursor: "pointer" }}
            >
              Privacy Policy
            </span>
          </p>

          {/* Divider */}
          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
            <span
              style={{
                padding: "0 14px",
                color: "rgba(255, 255, 255, 0.25)",
                fontSize: "12px",
              }}
            >
              or
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span
              style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "14px" }}
            >
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
                transition: "color 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#e50914")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
            >
              Sign in
            </Link>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default SignUpPage;
