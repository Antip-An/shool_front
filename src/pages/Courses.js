import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import AdminAddCoursesdModal from "../components/AdminAddCoursesModal";
import AdminEditCoursesdModal from "../components/AdminEditCoursesModal";
import { getData, postData, deleteData } from "../utils/network";
import { cartContext } from "../Page";

import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import useUser from "../hooks/useUser";

const CourseCard = ({ course, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const { userData: user } = useUser();

  return (
    <CardGroup>
      <Card style={{ width: "22rem", marginTop: "20px" }}>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/courses/" + course.id);
            }}
          >
            Подробнее
          </Button>

          {user && user.role === "admin" && (
            <>
              <Button variant="primary" onClick={onUpdate}>
                Изменить
              </Button>

              <Button variant="primary" onClick={onDelete}>
                Удалить
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </CardGroup>
  );
};

const Courses = () => {
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editCourseData, setEditCourseData] = useState();
  const [CoursesList, setCoursesList] = useState(false);
  const { cartList, setCartList } = useContext(cartContext);

  // const getUserData = async () => {
  //   const { user } = await getData("/users/1");
  //   if (user.role === "admin") return setIsAdmin(true);
  // };

  async function getCoursesList() {
    const { success, courses, message } = await getData("/courses/list/10");
    if (!success) return alert(message);
    return setCoursesList(courses);
  }

  async function handleDelete(courseId) {
    const { success, message } = await deleteData(`/courses/${courseId}`);
    if (!success) return alert(message);
    await getCoursesList();
  }

  async function handleUpdate(course) {
    setEditModalShow(true);
    setEditCourseData(course);
  }

  // function handleAdd(itemId) {
  //   const candidate = cartList.findIndex((item) => item.id === itemId);
  //   if (candidate >= 0) {
  //     const updatedCart = [...cartList];
  //     updatedCart[candidate].amount += 1;
  //     setCartList(updatedCart);
  //   } else {
  //     setCartList((prev) => [...prev, { id: itemId, amount: 1 }]);
  //   }
  // }

  // async function deleteCourse(courseId) {
  //   const { success, message } = await postData("/courses/del", { courseId });
  //   if (!success) return alert(message);
  //   await getCoursesList();
  //   return alert(message);
  // }

  useEffect(() => {
    getCoursesList();
  }, []);

  return (
    <Container>
      <h1 className="pt-3" style={{ color: "rgba(0,0,0,.55)" }}>
        Курсы
      </h1>
      {user && user.role === "admin" && (
        <>
          <AdminAddCoursesdModal
            show={addModalShow}
            getCoursesList={getCoursesList}
            onHide={() => setAddModalShow(false)}
          />

          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Добавить Курс
          </Button>
        </>
      )}

      {user && user.role === "admin" && editCourseData && (
        <>
          <AdminEditCoursesdModal
            show={editModalShow}
            coursesData={editCourseData}
            getCoursesList={getCoursesList}
            onHide={() => setEditModalShow(false)}
          />

          {/* <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Изменить
          </Button> */}
        </>
      )}

      <Row>
        {CoursesList ? (
          CoursesList.map((course) => (
            <Col>
            <CourseCard
              key={course.id}
              course={course}
              isAdmin={user && user.role === "admin"}
              onUpdate={() => handleUpdate(course)}
              onDelete={() => handleDelete(course.id)}
            />
            </Col>
          ))
        ) : (
          <h3>Курсов нет</h3>
        )}

      </Row>
    </Container>
  );
};
export default Courses;
