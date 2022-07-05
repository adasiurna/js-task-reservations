import React from "react";
import { Container, Col, Row } from "reactstrap";
import ReservationForm from "./ReservationForm";

const App = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xl="6">
          <h1 className="mb-4">RESERVATION FORM</h1>
          <ReservationForm />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
