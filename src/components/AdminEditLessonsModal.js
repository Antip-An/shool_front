import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminEditLessonsdModal(props) {
  const [title, setTitle] = useState();
  const [lesson, setlesson] = useState();
  const [file, setFile] = useState()

  const editLesson = async (e) => {
    e.preventDefault()
    // const { success, message, id: photo } = await uploadImage(file)
    const response = await postData(`/lessons/update/${props.lessonsData.id}`, { title, lesson  });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR");
      return;
    }
    setTitle()
    setlesson()
    props.getLessonsList()
    props.onHide()
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
        <Modal.Title
          id="contained-modal-title-vcenter"
        >Изменение данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form
            onSubmit={ editLesson }
          >
            <Form.Group className="reg-fg">
              <Form.Label>Название</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите название урока"
                defaultValue={props.lessonsData.title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Текст</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите текст"
                defaultValue={props.lessonsData.lesson}
                onChange={(event) => setlesson(event.target.value)}
              />
            </Form.Group>

            <Button
              className='ms-auto mt-3'
              type='submit'
            >Изменить данные</Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
