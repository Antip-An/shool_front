import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import AdminAddCoursesdModal from "../components/AdminAddCoursesModal";
import AdminEditCoursesdModal from "../components/AdminEditCoursesModal";
import { getData, postData, deleteData } from "../utils/network";
import { cartContext } from "../Page";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import useUser from "../hooks/useUser";

const LessonCard = ({ lesson, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const { userData: user } = useUser();
  
  return (
    <Card style={{ width: "22rem" }}>
      <Card.Body>
        <Card.Title>{lesson.title}</Card.Title>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/lessons/" + lesson.id);
          }}
        >
          Начать
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
  );
};

const CourseOne = () => {
  let { id } = useParams();
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [LessonsList, setLessonsList] = useState(false);
  const { cartList, setCartList } = useContext(cartContext);

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
  }, []);

  return (
    <Container>
      <h1>Курс</h1>
      {/* <h1>Курс {course.title}</h1>
      <h3>Описание: {course.description}</h3> */}

      {user && user.role === "admin" && (
        <>
          <AdminAddCoursesdModal
            show={addModalShow}
            getLessonsList={getLessonsList}
            onHide={() => setAddModalShow(false)}
          />
          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Добавить урок
          </Button>
        </>
      )}
      {LessonsList ? (
        LessonsList.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isAdmin={user && user.role === "admin"}
            onDelete={() => handleDelete(lesson.id)}
          />
        ))
      ) : (
        <h3>Уроков нет</h3>
      )}
    </Container>
  );
};

export default CourseOne;
