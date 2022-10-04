import { useNavigate } from "react-router";
import { useState } from "react";

import CloseButton from 'react-bootstrap/CloseButton';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SingUp = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Card style={{ marginTop: 30 }}>
          <Card.Body>
            <Row>
              <Col><Card.Title>Регистрация</Card.Title></Col>
              <Col><CloseButton 
                style={{marginLeft:"97%"}}
                onClick={() => {
                  navigate("/profile");
                }}
                />
              </Col>
            </Row>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Логин</Form.Label>
                  <Form.Control required type="text" placeholder="Логин" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="email" placeholder="Email" />
                  <Form.Control.Feedback>Молодец!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control id="password" type="password" required placeholder="Пароль" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control id="confirm-password" required type="password" placeholder="Пароль" />
                  <Form.Control.Feedback>Все отлично!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Я согласен на условия"
                  feedback="Необходимо ваше согласие"
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button type="submit">Зарегистрироваться</Button>
            </Form>

            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Войти
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SingUp;
