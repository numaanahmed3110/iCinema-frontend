import { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { PaymentMethod } from "../models/Payment";

interface PaymentFormProps {
  totalAmount: number;
  onPayment: (method: PaymentMethod, cardDetails: CardDetails) => void;
  loading?: boolean;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const PaymentForm = ({
  totalAmount,
  onPayment,
  loading = false,
}: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CREDIT");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const discount = paymentMethod === "CREDIT" ? 0.1 : 0.05;
  const discountAmount = totalAmount * discount;
  const finalAmount = totalAmount - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPayment(paymentMethod, cardDetails);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card className="bg-dark text-white border-secondary">
      <Card.Header className="bg-secondary">
        <h5 className="mb-0">Payment Details</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div className="mb-4">
            <Form.Label className="fw-bold">Select Payment Method</Form.Label>
            <Row>
              <Col xs={6}>
                <Card
                  className={`cursor-pointer ${paymentMethod === "CREDIT" ? "border-danger" : "border-secondary"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setPaymentMethod("CREDIT")}
                >
                  <Card.Body className="text-center bg-dark text-white">
                    <div className="fs-3 mb-2">💳</div>
                    <div className="fw-bold">Credit Card</div>
                    <small className="text-success">10% OFF</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card
                  className={`cursor-pointer ${paymentMethod === "DEBIT" ? "border-danger" : "border-secondary"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setPaymentMethod("DEBIT")}
                >
                  <Card.Body className="text-center bg-dark text-white">
                    <div className="fs-3 mb-2">🏧</div>
                    <div className="fw-bold">Debit Card</div>
                    <small className="text-success">5% OFF</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Card Details */}
          <Form.Group className="mb-3">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={cardDetails.cardHolderName}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardHolderName: e.target.value,
                })
              }
              className="bg-secondary text-white border-0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardNumber: formatCardNumber(e.target.value),
                })
              }
              maxLength={19}
              className="bg-secondary text-white border-0"
              required
            />
          </Form.Group>

          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryDate: formatExpiry(e.target.value),
                    })
                  }
                  maxLength={5}
                  className="bg-secondary text-white border-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="***"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                    })
                  }
                  maxLength={3}
                  className="bg-secondary text-white border-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Price Summary */}
          <Alert variant="dark" className="border-secondary">
            <div className="d-flex justify-content-between mb-2">
              <span>Original Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-success">
              <span>
                Discount ({paymentMethod === "CREDIT" ? "10%" : "5%"}):
              </span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Final Amount:</span>
              <span className="text-success">₹{finalAmount.toFixed(2)}</span>
            </div>
          </Alert>

          <Button
            variant="danger"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${finalAmount.toFixed(2)}`}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PaymentForm;
