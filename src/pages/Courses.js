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
import photo1 from "../assets/1.jpg";

const CourseCard = ({ course, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const { userData: user } = useUser();

  return (
    <CardGroup>
      <Card style={{ marginTop: "20px", marginBottom: "20px", backgroundColor:"rgb(204, 227, 231)" }}>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Container>
            <Row className="card-actions">
              <Col xs={4} md={12} lg={4}>
                <Button
                  size="sm"
                  style={{ backgroundColor: "rgb(1, 94, 113)", borderColor:"rgb(1, 94, 113)" }}
                  onClick={() => {
                    navigate("/courses/" + course.id);
                  }}
                  
                >
                  Подробнее
                </Button>
              </Col>
              
              {user && user.role === "admin" && (
                <>
                  <Col xs={4} md={12} lg={4}>
                    <Button
                      size="sm"
                      // style={{ marginLeft: "10px" }}
                      style={{ backgroundColor:"rgba(1, 94, 113)", borderColor:"rgb(1, 94, 113)"}}
                      onClick={onUpdate}
                    >
                      Изменить
                    </Button>
                  </Col>

                  <Col xs={4} md={12} lg={4}>
                    <Button
                      size="sm"
                      // style={{ float: "right" }}
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

const Courses = () => {
  const { userData: user } = useUser();
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editCourseData, setEditCourseData] = useState();
  const [CoursesList, setCoursesList] = useState(false);

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

  useEffect(() => {
    getCoursesList();
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop:"20px" }}>Курсы</h1>
      {user && user.role === "admin" && (
        <>
          <AdminAddCoursesdModal
            show={addModalShow}
            getCoursesList={getCoursesList}
            onHide={() => setAddModalShow(false)}
          />

          <Button 
            style={{ backgroundColor:"rgba(1, 94, 113)", borderColor:"rgb(1, 94, 113)" }}
            onClick={() => setAddModalShow(true)}
          >
            Добавить курс
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
            <Col id="col" md={4} xs={12}>
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
