import { useNavigate } from "react-router";
import { useState } from "react";

import CloseButton from 'react-bootstrap/CloseButton';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { postData, getData } from "../utils/network";
import useLoginGuard from "../hooks/useLoginGuard";

const SingUp = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      if (password !== confirmPassword) {
        alert("Неверный пароль");
        return;
      }
    }
    else {
  
    const response = await postData("/users/singup", {
      email,
      login,
      password
    });
  
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

//   const onRegistr = async () => {
//     if (password !== confirmPassword) {
//       alert("Неверный пароль");
//       return;
//     }

//   const response = await postData("/users/singup", {
//     email,
//     login,
//     password
//   });

//   if (!response.success) {
//     alert(response.message);
//     if (response.code !== "NETWORK_ERROR") setPassword("");
//     return;
//   }

//   localStorage.setItem("token", response.token);
//   navigate("/");
// };

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
                  navigate("/");
                }}
                />
              </Col>
            </Row>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="login">
                  <Form.Label>Логин</Form.Label>
                  <Form.Control 
                    required 
                    type="login" 
                    value={login}
                    placeholder="Логин" 
                    onChange={(event) => setLogin(event.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    required 
                    type="email" 
                    value={email}
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)} 
                  />
                  <Form.Control.Feedback>Молодец!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control 
                    required
                    type="password" 
                    value={password}
                    placeholder="Пароль" 
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form.Control.Feedback>Отлично!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="confirm-password">
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control 
                    required
                    type="password"
                    value={confirmPassword}
                    placeholder="Пароль" 
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
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
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default SingUp;
