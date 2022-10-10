import { ChevronCompactDown } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import logo from "../assets/logo.png";
import photo1 from "../assets/1.jpg";
import photo2 from "../assets/2.jpg";
import photo3 from "../assets/3.jpg";

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
      <Carousel interval={null}>
        <Carousel.Item>
          <img id="phot" src={photo1} />
          <Carousel.Caption>
            <img id="logo" src={logo} />
            <h1>Школа чародейства и волшебства Хогвартс</h1>
            <h4>Онлайн-курсы магических дисциплин</h4>
            <ChevronCompactDown style={{ marginBottom: "-20px" }} size={40} />
            <br />
            <ChevronCompactDown style={{ marginBottom: "-15px" }} size={35} />
            <br />
            <ChevronCompactDown style={{ marginBottom: "-10px" }} size={30} />
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img id="phot" src={photo2} />

          <Carousel.Caption style={{ marginTop: "-100px" }}>
            <h1>Присоединяйтесь</h1>
            <h5>С нами вы сможете узнать много нового!</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img id="phot" src={photo3} />

          <Carousel.Caption style={{ marginTop: "170px" }}>
            <h3>Самые разнообразные факты</h3>
            <h3>о вашей любимой магической вселенной!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
};

export default Home;
