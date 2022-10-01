import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";
import photo from "../assets/4.png";
import useToken from "../hooks/useToken";
import { PersonSquare, XCircle } from 'react-bootstrap-icons';


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
              {/* TODO */}
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
