import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AdminAddProductsdModal from "../components/AdminAddProductModal";
import AdminEditProductsdModal from "../components/AdminEditProductModal";
import { cartContext } from '../templates/page';
import { getData, postData } from "../utils/network";


const CourseCard = ({ courses, isAdmin, getCoutsetList, handleAdd, deleteCourse }) => {
    const [editModalShow, setEditModalShow] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(false)

    function getPhoto() {
        getData(`/photos/one/${courses.photo_id}`).then(({ success, photo }) => {
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
                        <AdminEditProductsdModal
                            show={editModalShow}
                            coursesData={courses}
                            getCoutsetList={getCoutsetList}
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
    const [CoursesList, setProductList] = useState(false)
    const { cartList, setCartList } = useContext(cartContext);

    const getUserData = async () => {
        const { user } = await getData('/users/one')
        if (user.role === "admin") return setIsAdmin(true)
    }

    async function getCoutsetList() {
        const { success, courses, message } = await getData('/courses/list')
        if (!success) return alert(message);
        return setProductList(products)
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

    async function deleteCourse(productId) {
        const { success, message } = await postData("/products/del", { productId });
        if (!success) return alert(message)
        await getProductList()
        return alert(message)
    }

    useEffect(() => {
        getCoutsetList()
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
                    <AdminAddProductsdModal
                        show={addModalShow}
                        getProductList={getProductList}
                        onHide={() => setAddModalShow(false)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddModalShow(true)}
                    >Добавить товар</Button>
                </>
            }
            {productList ?
                productList.map((product) => <CourseCard
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    getProductList={getProductList}
                    handleAdd={handleAdd}
                    deleteProduct={deleteProduct}
                />
                )
                :
                <h3>Сейчас товаров нет, приходите позже :)</h3>
            }
        </Container>
    )
}
export default Courses
