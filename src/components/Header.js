import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate  } from "react-router";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/logo.png";
import photo from "../assets/4.png";
import useToken from "../hooks/useToken";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { loggedIn } = useToken();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
            <img id="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/" disabled={pathname === "/"}>Главная</Nav.Link>
            <Nav.Link as={Link} to="/courses" disabled={pathname === "/courses"}>Курсы</Nav.Link>
            <NavDropdown title="О нас">
              <NavDropdown.Item as={Link} to="/privacy">
                Политика конфиденциальности
              </NavDropdown.Item>
              {/* TODO */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to="/profile">
          <img id="photo" src={photo} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;