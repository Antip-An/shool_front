import { useState } from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { postData } from "../utils/network";
import useLoginGuard from "../hooks/useLoginGuard";

const SingIn = () => {
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

  useLoginGuard({ loggedIn: true, path: "/" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault()
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
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    required type="email" 
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Form.Control.Feedback>Молодец!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control 
                    id="password" 
                    required type="password" 
                    placeholder="Пароль" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form.Control.Feedback>Все отлично!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Button type="submit" onClick={onLogin}>Войти</Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SingIn;
