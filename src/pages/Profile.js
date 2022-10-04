import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Table } from "react-bootstrap";
import { getData, postData } from "../utils/network";
import useUser from "../hooks/useUser";

const UserForm = () => {
  const [newLogin, setNewLogin] = useState();
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();

  const editUserData = (e) => {
    e.preventDefault();
    postData("/users/profile/edit", { login: newLogin, email: newEmail, password })
      .then(response => {
        if (!response.success) {
          alert(response.message);
          if (response.code !== "NETWORK_ERROR")
            return;
        }
        return alert("Данные успешно изменены")
      })
  };

  return (
    <Container className="my-5">
      <Col
        className="mx-auto"
        md={6}
        sm={12}
      >
        <Card className="w-100">
          <Card.Body>
            <Card.Title style={{ "fontFamily": "Century Gothic","letterSpacing": "3.5px", "textAlign": "center","fontSize":"30px" }}>Изменить ваши данные</Card.Title>
            <Form onSubmit={editUserData}>
              <Form.Group className="reg-fg">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  type="login"
                  placeholder="Введите логин"
                  id="login"
                  value={newLogin}
                  onChange={(event) => setNewLogin(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="reg-fg">
                <Form.Label>Адрес электронной почты</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Введите email"
                  id="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="reg-fg">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group> <br/>
              <Button onSubmit={editUserData} style={{"width":"300px",  "margin": "0 auto", "display": "block","borderColor": "black", "color": "black", backgroundColor:"rgb(120, 189, 201)"}} type='submit'>Изменить</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

const Profile = () => {

  const {userData:user} = useUser()

  return (
    <Container>
      <h1 className="pt-3" style={{ textAlign:"center" }}>Профиль</h1>
      {user &&
        <>
          <h3>Логин:</h3> <p>{user.login}</p>
          <h3>Email:</h3> <p>{user.email}</p>
        </>
      }
      <UserForm />
    </Container>
  );
}
export default Profile
