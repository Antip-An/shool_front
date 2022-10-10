import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminAddTasksdModal(props) {
  const [question, setQuestion] = useState();
  const [right_answer, setRightAnswer] = useState();
  const [file, setFile] = useState()

  const createTask = async (event) => {
    event.preventDefault()

      const response = await postData("/tasks/create", { question, right_answer, id_lesson: props.lessonId });

      if (!response.success) {
        alert(response.message);
        if (response.code !== "NETWORK_ERROR");
        return;
      }
      setQuestion("")
      setRightAnswer("")
      props.getTasksList()
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
          Добавление вопроса
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createTask}>
            <Form.Group className="reg-fg">
              <Form.Label>Вопрос</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите вопрос"
                required
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Ответ</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите правильный ответ"
                required
                id="right_answer"
                value={right_answer}
                onChange={(event) => setRightAnswer(event.target.value)}
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
