import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getData, postData, deleteData } from "../utils/network";

import AdminAddCoursesdModal from "../components/AdminAddCoursesModal";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import useUser from "../hooks/useUser";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const { userData: user } = useUser();

  return (
    <Card style={{ width: "40rem" }}>
    <Form style={{margin:"15px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{task.question}</Form.Label>
        <Form.Control type="task" placeholder="Ваш ответ" />
      </Form.Group>

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
    </Form>

    <Button style={{margin:"20px"}}>
      Завершить
    </Button>
    </Card>
  );
};

const LessonOne = () => {
  let { id } = useParams();
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [TasksList, setTasksList] = useState(false);

  // const getUserData = async () => {
  //   const { user } = await getData("/users/1");
  //   if (user.role === "admin") return setIsAdmin(true);
  // };

  async function getTasksList() {
    const { success, tasks, message } = await getData(
      `/lessons/${id}/tasks`
      );
    if (!success) return alert(message);
    return setTasksList(tasks);
  }

  async function handleDelete(taskId) {
    const { success, message } = await deleteData(`/tasks/${taskId}`);
    if (!success) return alert(message);
    await getTasksList();
  }

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <Container>
      <h1>Урок</h1>
      {user && user.role === "admin" && (
        <>
          <AdminAddCoursesdModal
            show={addModalShow}
            getTasksList={getTasksList}
            onHide={() => setAddModalShow(false)}
          />

          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Добавить вопрос
          </Button>
        </>
      )}

      {TasksList ? (
        TasksList.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isAdmin={user && user.role === "admin"}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      ) : (
        <h3>Вопросов нет</h3>
      )}
    </Container>
  );
};
export default LessonOne;
