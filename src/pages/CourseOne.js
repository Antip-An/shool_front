import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import AdminAddLessonsdModal from "../components/AdminAddLessonsModal";
import AdminEditLessonsdModal from "../components/AdminEditLessonsModal";
import { getData, postData, deleteData } from "../utils/network";
import { cartContext } from "../Page";

import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import useUser from "../hooks/useUser";
import "../index.css"

const LessonCard = ({ lesson, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const { userData: user } = useUser();

  return (
    <CardGroup>
      <Card
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "rgb(204, 227, 231)",
        }}
      >
        <Card.Body>
          <Card.Title>{lesson.title}</Card.Title>
          <Container>
            <Row className="card-actions">
              <Col xs={4} md={12} lg={4}>
                <Button
                  size="sm"
                  style={{ backgroundColor: "rgb(1, 94, 113)", borderColor:"rgb(1, 94, 113)" }}
                  onClick={() => {
                    navigate("/lessons/" + lesson.id);
                  }}
                >
                  Начать
                </Button>
              </Col>

              {user && user.role === "admin" && (
                <>
                  <Col xs={4} md={12} lg={4}>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "rgb(1, 94, 113)", borderColor:"rgb(1, 94, 113)" }}
                      onClick={onUpdate}
                    >
                      Изменить
                    </Button>
                  </Col>

                  <Col xs={4} md={12} lg={4}>
                    <Button
                      size="sm"
                      style={{ backgroundColor:"rgba(158, 5, 5)", borderColor:"rgba(158, 5, 5)" }}
                      onClick={onDelete}
                    >
                      Удалить
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};

const CourseOne = () => {
  let { id } = useParams();
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editLessonData, setEditLessonData] = useState();
  const [LessonsList, setLessonsList] = useState(false);
  const [courseData, setCourseData] = useState();
  const { cartList, setCartList } = useContext(cartContext);
  const navigate = useNavigate();

  // const getUserData = async () => {
  //   const { user } = await getData("/users/1");
  //   if (user.role === "admin") return setIsAdmin(true);
  // };

  async function getLessonsList() {
    const { success, lessons, message } = await getData(
      `/courses/${id}/lessons`
    );
    if (!success) return alert(message);
    return setLessonsList(lessons);
  }

  async function handleDelete(lessonId) {
    const { success, message } = await deleteData(`/lessons/${lessonId}`);
    if (!success) return alert(message);
    await getLessonsList();
  }

  async function handleUpdate(lesson) {
    setEditModalShow(true);
    setEditLessonData(lesson);
  }

  // Описание курса
  async function loadCourseData() {
    const result = await getData(`/courses/${id}`);
    console.log(result);
    if (!result.success) return;
    setCourseData(result.order);
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

  // async function deleteLesson(lessonId) {
  //   const { success, message } = await postData("/lessons/del", { lessonId });
  //   if (!success) return alert(message);
  //   await getLessonsList();
  //   return alert(message);
  // }

  useEffect(() => {
    getLessonsList();
    loadCourseData();
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop:"20px" }}>
        Курс {courseData && courseData.title}
      </h1>
      <h3>Описание: {courseData && courseData.description}</h3>

      {user && user.role === "admin" && (
        <>
          <AdminAddLessonsdModal
            show={addModalShow}
            courseId={id}
            getLessonsList={getLessonsList}
            onHide={() => setAddModalShow(false)}
          />
          <Button
            style={{
              backgroundColor: "rgba(1, 94, 113)",
              borderColor: "rgb(1, 94, 113)",
            }}
            onClick={() => setAddModalShow(true)}
          >
            Добавить урок
          </Button>
        </>
      )}

      {user && user.role === "admin" && editLessonData && (
        <>
          <AdminEditLessonsdModal
            show={editModalShow}
            lessonsData={editLessonData}
            getLessonsList={getLessonsList}
            onHide={() => setEditModalShow(false)}
          />

          {/* <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Изменить
          </Button> */}
        </>
      )}

      <Row>
        {LessonsList ? (
          LessonsList.map((lesson) => (
            <Col id="col" md={4} xs={12}>
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isAdmin={user && user.role === "admin"}
                onUpdate={() => handleUpdate(lesson)}
                onDelete={() => handleDelete(lesson.id)}
              />
            </Col>
          ))
        ) : (
          <h3>Уроков нет</h3>
        )}
      </Row>
    </Container>
  );
};

export default CourseOne;
