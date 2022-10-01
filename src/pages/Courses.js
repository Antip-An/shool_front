import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AdminAddCoursesdModal from "../components/AdminAddCoursesModal";
import AdminEditCoursesdModal from "../components/AdminEditCoursesModal";
import { cartContext } from '../Page';
import { getData, postData } from "../utils/network";

const CourseCard = ({ courses, isAdmin, getCoutsesList, handleAdd, deleteCourse }) => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${courses.photo}`).then(({ success, photo }) => {
            if (success) return setPhotoUrl(photo.photo_path)
        })
    }

    useEffect(() => {
        getPhoto()
    }, [])
    return (
        <Row style={{"margin": "20px"}}> 
            <Col>
                {photoUrl &&
                    <Card.Img
                        style={{ width: '90%' }}
                        src={photoUrl}
                    />
                }
            </Col> 
            <Col>
                <h2
                    className='p-1'
                    style={{textAlign: 'center'}}>{courses.title}</h2>
                <p style={{ textAlign: 'left', }}>Описание: {courses.description}</p>
                {isAdmin ?
                    (<>
                        <AdminEditCoursesdModal
                            show={editModalShow}
                            coursesData={courses}
                            getCoutsetList={getCoutsesList}
                            onHide={() => setEditModalShow(false)}
                        />
                        <Container>
                            <Button
                                className="mx-3"
                                onClick={() => setEditModalShow(true)}
                                style={{ width: '250px' }}
                            >Изменить</Button>
                            <Button
                                className="mx-3"
                                onClick={() => deleteCourse(courses.id)}
                                style={{ width: '250px' }}
                            >Удалить</Button>
                        </Container>
                    </>
                    )
                    :
                    (<Button
                        className="w-100"
                        onClick={() => handleAdd(courses.id)}
                    >Начать</Button> 
                    )
                    
                }
                
            </Col> 
                
            {/* <Col xs={18} sm={6}>
                {photoUrl &&
                    <Card.Img
                        style={{ width: '90%' }}
                        src={photoUrl}
                    />
                }
            </Col> */}
        </Row> 
    )
}

const Courses = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [CoursesList, setCoursesList] = useState(false)
    const { cartList, setCartList } = useContext(cartContext);

    const getUserData = async () => {
        const { user } = await getData('/users/1')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getCoutsesList() {
        const { success, courses, message } = await getData('/courses/list')
        if (!success) return alert(message);
        return setCoursesList(courses)
    }

    function handleAdd(itemId) {
        const candidate = cartList.findIndex(item => item.id === itemId)
        if (candidate >= 0) {
            const updatedCart = [...cartList]
            updatedCart[candidate].amount += 1
            setCartList(updatedCart)
        }
        else {
            setCartList(prev => [...prev, { id: itemId, amount: 1 }])
        }
    }

    async function deleteCourse(courseId) {
        const { success, message } = await postData("/courses/del", { courseId });
        if (!success) return alert(message)
        await getCoutsesList()
        return alert(message)
    }

    useEffect(() => {
        getCoutsesList()
        getUserData()
    }, [])
    
    return (
        <Container>
            <h1
                className="pt-3"
                style={{ color: 'rgba(0,0,0,.55)' }}
            >Курсы</h1>
            {isAdmin &&
                <>
                    <AdminAddCoursesdModal
                        show={addModalShow}
                        getCoursesList={getCoutsesList}
                        onHide={() => setAddModalShow(false)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddModalShow(true)}
                    >Добавить товар</Button>
                </>
            }
            {CoursesList ?
                CoursesList.map((courses) => <CourseCard
                    key={courses.id}
                    courses={courses}
                    isAdmin={isAdmin}
                    getCoursesList={getCoutsesList}
                    handleAdd={handleAdd}
                    deleteCourse={deleteCourse}
                />
                )
                :
                <h3>Курсов нет</h3>
            }
        </Container>
    )
}
export default Courses
