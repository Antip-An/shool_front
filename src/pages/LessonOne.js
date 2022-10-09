import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getData, postData, deleteData } from "../utils/network";

import AdminAddTasksdModal from "../components/AdminAddTasksModal";
import AdminEditTasksdModal from "../components/AdminEditTasksModal";

import CardGroup from "react-bootstrap/CardGroup";
import CloseButton from "react-bootstrap/CloseButton";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import useUser from "../hooks/useUser";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const { userData: user } = useUser();

  return (
    <CardGroup>
      <Card style={{ marginTop: "20px" }}>
        <div style={{ margin: "15px" }}>
          <Form.Group className="mb-3" controlId={`task_${task.id}`}>
            <Form.Label>{task.question}</Form.Label>
            <Form.Control
              type="task"
              placeholder="Ваш ответ"
              name={`task_${task.id}`}
            />
          </Form.Group>

          {user && user.role === "admin" && (
            <>
              <Button variant="primary" onClick={onUpdate}>
                Изменить
              </Button>

              <Button
                style={{ float: "right" }}
                variant="danger"
                onClick={onDelete}
              >
                Удалить
              </Button>
            </>
          )}
        </div>
      </Card>
    </CardGroup>
  );
};

const LessonOne = () => {
  let { id } = useParams();
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTaskData, setEditTaskData] = useState();
  const [TasksList, setTasksList] = useState(false);
  const [lessonData, setLessonData] = useState();
  const navigate = useNavigate();

  // const getUserData = async () => {
  //   const { user } = await getData("/users/1");
  //   if (user.role === "admin") return setIsAdmin(true);
  // };

  async function getTasksList() {
    const { success, tasks, message } = await getData(`/lessons/${id}/tasks`);
    if (!success) return alert(message);
    return setTasksList(tasks);
  }

  async function handleDelete(taskId) {
    const { success, message } = await deleteData(`/tasks/${taskId}`);
    if (!success) return alert(message);
    await getTasksList();
  }

  async function handleUpdate(task) {
    setEditModalShow(true);
    setEditTaskData(task);
  }

  async function loadLessonsData() {
    const result = await getData(`/lessons/${id}`);
    console.log(result);
    if (!result.success) return;
    setLessonData(result.order);
  }

  useEffect(() => {
    getTasksList();
    loadLessonsData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    let total = 0;
    let success = 0;
    for (let key in formDataObject) {
      const taskId = Number(key.split("_")[1]);
      const task = TasksList.find((t) => t.id === taskId);
      if (!task) continue;
      const answer = formDataObject[key];
      if (answer === task.right_answer) success += 1;
      total += 1;
    }
    alert(`${success}/${total}`);
    // console.log(formDataObject)
  }

  return (
    <Container>
      <h1 style={{ textAlign: "center", color: "rgba(0,0,0,.55)" }}>
        Урок {lessonData && lessonData.title}
      </h1>
      <h3>{lessonData && lessonData.study}</h3>

      {user && user.role === "admin" && (
        <>
          <AdminAddTasksdModal
            show={addModalShow}
            lessonId={id}
            getTasksList={getTasksList}
            onHide={() => setAddModalShow(false)}
          />

          <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Добавить вопрос
          </Button>
        </>
      )}

      {user && user.role === "admin" && editTaskData && (
        <>
          <AdminEditTasksdModal
            show={editModalShow}
            tasksData={editTaskData}
            getTasksList={getTasksList}
            onHide={() => setEditModalShow(false)}
          />

          {/* <Button variant="primary" onClick={() => setAddModalShow(true)}>
            Изменить
          </Button> */}
        </>
      )}

      <Form onSubmit={handleSubmit}>
        {TasksList ? (
          TasksList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isAdmin={user && user.role === "admin"}
              onUpdate={() => handleUpdate(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <h3>Вопросов нет</h3>
        )}
        <Button
          style={{ marginTop: "20px", marginBottom: "20px" }}
          type="submit"
        >
          Завершить
        </Button>
      </Form>
    </Container>
  );
};
export default LessonOne;
