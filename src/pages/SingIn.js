import { useNavigate } from "react-router";
import { postData } from "../utils/network";
import { useState } from "react";

import CloseButton from 'react-bootstrap/CloseButton';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import useLoginGuard from "../hooks/useLoginGuard";

const SingIn = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    else {
      const response = await postData("/users/singin", { email, password });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR") setPassword("");
      return;
    }

    localStorage.setItem("token", response.token);
    navigate("/");
    }

    setValidated(true);
  };

  useLoginGuard({ loggedIn: true, path: "/" });

  const onLogin = async (e) => {
    const response = await postData("/users/singin", { email, password });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR") setPassword("");
      return;
    }

    localStorage.setItem("token", response.token);
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Card style={{ marginTop: 30 }}>
          <Card.Body>
            <Row>
              <Col><Card.Title>Вход в систему</Card.Title></Col>
              <Col><CloseButton 
                style={{marginLeft:"97%"}}
                onClick={() => {
                  navigate("/");
                }}
                />
              </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    required 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Form.Control.Feedback>Молодец!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control 
                    required 
                    type="password" 
                    placeholder="Пароль" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form.Control.Feedback>Все отлично!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit">Войти</Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SingIn;
