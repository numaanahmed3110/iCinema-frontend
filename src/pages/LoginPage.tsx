import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { buildUrl } from "../config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(buildUrl("/api/auth/login"), {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "16px 20px",
    fontSize: "15px",
    color: "#fff",
    transition: "all 0.3s ease",
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
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
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
            maxWidth: "420px",
            width: "100%",
            padding: "48px 40px",
            background: "rgba(15, 15, 25, 0.8)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                borderRadius: "16px",
                fontSize: "28px",
                boxShadow: "0 8px 32px rgba(229, 9, 20, 0.35)",
              }}
            >
              🎬
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "8px",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.5)",
                margin: 0,
              }}
            >
              Sign in to your iCinema account
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

          {/* Login Form */}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Label
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(229, 9, 20, 0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(229, 9, 20, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(229, 9, 20, 0.5)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(229, 9, 20, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 border-0"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                padding: "16px",
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <span
              style={{
                padding: "0 16px",
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "13px",
              }}
            >
              or
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span
              style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px" }}
            >
              New to iCinema?{" "}
            </span>
            <Link
              to="/signup"
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
              Create an account
            </Link>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default LoginPage;
