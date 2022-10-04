import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { PersonSquare, XCircle } from 'react-bootstrap-icons';
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

import useToken from "../hooks/useToken";
import logo from "../assets/logo.png";

import "./header.css";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useToken();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img id="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/" disabled={pathname === "/"}>
              Главная
            </Nav.Link>
            {loggedIn ? (
            <Nav.Link
              as={Link}
              to="/courses"
              disabled={pathname === "/courses"}
            >
              Курсы
            </Nav.Link>
            ) : ( null )}

            <NavDropdown title="О нас">
              <NavDropdown.Item as={Link} to="/privacy">
                Политика конфиденциальности
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about">
                Контакты
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav class="ms-auto">
            {!loggedIn ? (
              <NavDropdown title="Вход" >
                <NavDropdown.Item as={Link} to="/singin">Войти</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/singup">
                  Зарегистрироваться
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  disabled={pathname === "/profile"}
                  style={{ display: "inline-block", marginRight:"15px" }}
                >
                  <PersonSquare size={35} />
                </Nav.Link>

                <Nav.Link
                  onClick={onLogout}
                  style={{ display: "inline-block" }}
                >
                  <XCircle size={35} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
