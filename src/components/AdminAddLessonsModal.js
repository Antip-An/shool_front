import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminAddLessonsdModal(props) {
  const [title, setTitle] = useState();
  const [lesson, setLesson] = useState();
  const [courseId, setCourseId] = useState();
  const [file, setFile] = useState()

  const createLesson = async (event) => {
    event.preventDefault()
    // const { success, message, id: photo } = await uploadImage(file)
    // if (success) {
      const response = await postData("/lessons/create", { title, lesson });

      if (!response.success) {
        alert(response.message);
        if (response.code !== "NETWORK_ERROR");
        return;
      }
      setTitle("")
      setLesson("")
      props.getLessonstList()
      props.courseId()
      return alert(response.message)
    // }
    // return alert(message)
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление урока
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createLesson}>
            <Form.Group className="reg-fg">
              <Form.Label>Название</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите название урока"
                required
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Урок</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите текст"
                required
                id="lesson"
                value={lesson}
                onChange={(event) => setLesson(event.target.value)}
              />
            </Form.Group>
            
            <Button className='ms-auto mt-3' type='submit'>Добавить</Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
