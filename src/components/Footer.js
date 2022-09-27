import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <Container id="footer" fluid>
      <Row>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Хогвартс</h3>
          <p>Онлайн-курсы магических дисциплин</p>
        </Col>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Страницы портала</h3>
          <ul>
            <li>
              <Link className={pathname === "/" ? "current" : ""} to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/courses" ? "current" : ""}
                to="/courses"
              >
                Курсы
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/myCourses" ? "current" : ""}
                to="/myCourses"
              >
                Мои курсы
              </Link>
            </li>
            {/* <li>
              <Link
                className={pathname === "/about/privacy" ? "current" : ""}
                to="/about/privacy"
              >
                Политика конфиденциальности
              </Link>
            </li> */}
          </ul>
        </Col>
        <Col className="footer-element" xs={12} sm={4}>
          <h3>Внешние ссылки</h3>
          <ul>
            <li>
              <a target="_blank" rel="nofollow" href="https://vk.com">
                ВК: @hogwarts
              </a>
            </li>
            <li>
              <a href="mailto:issues@gmail.com">Почта: hogwarts@gmail.com</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="footer-element">
          <div>&copy; Портал - Магия 2022</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
