import { useLocation, useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import photo1 from "../assets/1.jpg";
import photo2 from "../assets/2.jpg";
import photo3 from "../assets/3.jpg";
import useToken from "../hooks/useToken";

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useToken();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Card>
      <Carousel interval={null}>
        <Carousel.Item>
          <img id="phot" src={photo1} />
          <Carousel.Caption>
            <img id="logo" src={logo} />
            <h1>Школа чародейства и волшебства Хогвартс</h1>
            <h4>Онлайн-курсы магических дисциплин</h4>
            {!loggedIn ? (
              <Button
                variant="light"
                as={Link}
                to="/singin"
                disabled={pathname === "/singin"}
              >
                Вход
              </Button>
            ) : (
              <Button onClick={onLogout}>Выход</Button>
            )}
            {!loggedIn ? (
              <Button
                variant="light"
                as={Link}
                to="/singup"
                disabled={pathname === "/singup"}
              >
                Регистрация
              </Button>
            ) : (
              <Button onClick={onLogout}>Регистрация</Button>
            )}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img id="phot" src={photo2} />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button
              variant="light"
              as={Link}
              to="/plesson"
              disabled={pathname === "/plesson"}
            >
              Пробный урок
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img id="phot" src={photo3} />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Card>
  );
};

export default Home;
