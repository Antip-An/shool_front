import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminEditTasksdModal(props) {
  const [question, setQuestion] = useState();
  const [right_answer, setRightAnswer] = useState();
  const [file, setFile] = useState()

  const editTask = async (e) => {
    e.preventDefault()
    // const { success, message, id: photo } = await uploadImage(file)
    const response = await postData(`/tasks/update/${props.tasksData.id}`, { question, right_answer });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR");
      return;
    }
    setQuestion()
    setRightAnswer()
    props.getTasksList()
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
            onSubmit={ editTask }
          >
            <Form.Group className="reg-fg">
              <Form.Label>Вопрос</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите вопрос"
                defaultValue={props.tasksData.question}
                onChange={(event) => setQuestion(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="reg-fg">
              <Form.Label>Ответ</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите правильный ответ"
                defaultValue={props.tasksData.right_answer}
                onChange={(event) => setRightAnswer(event.target.value)}
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
