import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminAddLessonsdModal(props) {
  const [title, setTitle] = useState();
  const [study, setStudy] = useState();
  const [file, setFile] = useState()

  const createLesson = async (event) => {
    event.preventDefault()

      const response = await postData("/lessons/create", { title, study, id_course: props.courseId });

      if (!response.success) {
        alert(response.message);
        if (response.code !== "NETWORK_ERROR");
        return;
      }
      setTitle("")
      setStudy("")
      props.getLessonsList()
      return alert(response.message)

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
                id="study"
                value={study}
                onChange={(event) => setStudy(event.target.value)}
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
