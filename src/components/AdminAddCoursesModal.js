import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminAddCoursesdModal(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState()

  const createCourse = async (event) => {
    event.preventDefault()
    // const { success, message, id: photo } = await uploadImage(file)
    // if (success) {
      const response = await postData("/courses/create", { title, description });

      if (!response.success) {
        alert(response.message);
        if (response.code !== "NETWORK_ERROR");
        return;
      }
      setTitle("")
      setDescription("")
      props.getCoursesList()
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
          Добавление курса
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form onSubmit={createCourse}>
            <Form.Group className="reg-fg">
              <Form.Label>Название</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите название курса"
                required
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите описание"
                required
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
