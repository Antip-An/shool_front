import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { PersonSquare, XCircle } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

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
    <Navbar expand="sm" id="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img id="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link
              style={{ color: "rgb(180, 222, 231)" }}
              as={Link}
              to="/"
              disabled={pathname === "/"}
            >
              Главная
            </Nav.Link>
            {loggedIn ? (
              <Nav.Link
                style={{ color: "rgb(180, 222, 231)" }}
                as={Link}
                to="/courses"
                disabled={pathname === "/courses"}
              >
                Курсы
              </Nav.Link>
            ) : null}

            <Nav.Link
              style={{ color: "rgb(180, 222, 231)" }}
              as={Link}
              to="/about"
              disabled={pathname === "/about"}
            >
              О нас
            </Nav.Link>
          </Nav>

          <Nav class="ms-auto" style={{ marginRight:"3%" }}>
            {!loggedIn ? (
              <NavDropdown style={{ color: "rgb(180, 222, 231)" }} title="Вход">
                <NavDropdown.Item as={Link} to="/singin">
                  Войти
                </NavDropdown.Item>
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
                  style={{ display: "inline-block", marginRight: "15px" }}
                >
                  <PersonSquare
                    style={{ color: "rgb(180, 222, 231)" }}
                    size={35}
                  />
                </Nav.Link>

                <Nav.Link
                  onClick={onLogout}
                  style={{ display: "inline-block" }}
                >
                  <XCircle style={{ color: "rgb(180, 222, 231)" }} size={35} />
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
