import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AdminAddCoursesdModal from "../components/AdminAddCoursesModal";
import AdminEditCoursesdModal from "../components/AdminEditCoursesModal";
import { cartContext } from "../Page";
import { getData, postData } from "../utils/network";
import { useNavigate } from "react-router";

const CourseCard = ({ course, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "22rem" }}>
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Button
            variant="primary"
            onClick={() => {
                navigate("/courses/"+course.id);
            }}>
                Подробнее
            </Button>
      </Card.Body>
    </Card>
  );
};

const Courses = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [CoursesList, setCoursesList] = useState(false);
  const { cartList, setCartList } = useContext(cartContext);

  const getUserData = async () => {
    const { user } = await getData("/users/1");
    if (user.role === "admin") return setIsAdmin(true);
  };

  async function getCoutsesList() {
    const { success, courses, message } = await getData("/courses/list/10");
    if (!success) return alert(message);
    return setCoursesList(courses);
  }

  function handleAdd(itemId) {
    const candidate = cartList.findIndex((item) => item.id === itemId);
    if (candidate >= 0) {
      const updatedCart = [...cartList];
      updatedCart[candidate].amount += 1;
      setCartList(updatedCart);
    } else {
      setCartList((prev) => [...prev, { id: itemId, amount: 1 }]);
    }
  }

  async function deleteCourse(courseId) {
    const { success, message } = await postData("/courses/del", { courseId });
    if (!success) return alert(message);
    await getCoutsesList();
    return alert(message);
  }

  useEffect(() => {
    getCoutsesList();
    getUserData();
  }, []);

  return (
    <Container>
      <h1 className="pt-3" style={{ color: "rgba(0,0,0,.55)" }}>
        Курсы
      </h1>
      {isAdmin && (
        <>
          <AdminAddCoursesdModal
            show={addModalShow}
            getCoursesList={getCoutsesList}
            onHide={() => setAddModalShow(false)}
          />
          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Добавить товар
          </Button>
        </>
      )}
      {CoursesList ? (
        CoursesList.map((course) => (
          <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
        ))
      ) : (
        <h3>Курсов нет</h3>
      )}
    </Container>
  );
};
export default Courses;
