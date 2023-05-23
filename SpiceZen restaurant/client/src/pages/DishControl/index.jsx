import React, {useEffect, useState, useRef} from 'react';
import {Button, Modal, ModalTitle} from 'react-bootstrap'
import axios from 'axios'
import "../../assets/styles/controldish.css"

export const DishControl = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => {
        SetViewShow(true)
    }
    const handleViewClose = () => {
        SetViewShow(false)
    }

    //For Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => {
        SetEditShow(true)
    }
    const handleEditClose = () => {
        SetEditShow(false)
    }

    //For Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => {
        SetDeleteShow(true)
    }
    const hanldeDeleteClose = () => {
        SetDeleteShow(false)
    }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => {
        SetPostShow(true)
    }
    const handlePostClose = () => {
        SetPostShow(false)
    }

    //Текущие поля
    const [currentDishName, setCurrentDishName] = useState("");
    const [currentDishCategory, setCurrentDishCategory] = useState("");
    const [currentDishType, setCurrentDishType] = useState("");
    const [currentDishPrice, setCurrentDishPrice] = useState("");
    const [currentDishWeight, setCurrentDishWeight] = useState("");
    const [currentDishDescription, setCurrentDishDescription] = useState("");
    const [currentDishImage, setCurrentDishImage] = useState("");

    //Define here local state that store the form Data
    const [dishName, setDishName] = useState("")
    const [dishCategory, setDishCategory] = useState("")
    const [dishType, setDishType] = useState("")
    const [dishPrice, setDishPrice] = useState("")
    const [dishWeight, setDishWeight] = useState("")
    const [dishDescription, setDishDescription] = useState("")
    const [dishImage, setDishImage] = useState("")

    const dishNameRef = useRef(null);
    const dishCategoryRef = useRef(null);
    const dishTypeRef = useRef(null);
    const dishPriceRef = useRef(null);
    const dishWeightRef = useRef(null);
    const dishDescriptionRef = useRef(null);
    const dishImageRef = useRef(null);

    const [isFormValid, setIsFormValid] = useState(false);

    const handleValidation = () => {

        const isDishNameValid = dishNameRef.current.checkValidity();
        const isDishCategoryValid = dishCategoryRef.current.checkValidity();
        const isDishTypeValid = dishTypeRef.current.checkValidity();
        const isDishPriceValid = dishPriceRef.current.checkValidity();
        const isDishWeightValid = dishWeightRef.current.checkValidity();
        const isDishDescriptionValid = dishDescriptionRef.current.checkValidity();
        const isDishImageValid = dishImageRef.current.checkValidity();

        const isFormValid =
            isDishNameValid &&
            isDishCategoryValid &&
            isDishTypeValid &&
            isDishPriceValid &&
            isDishWeightValid &&
            isDishDescriptionValid &&
            isDishImageValid;

        setIsFormValid(isFormValid);
    };


    const [Delete, setDelete] = useState(false)
    //ID for update record and Delete
    const [id, setId] = useState("");
    const GetDishesData = () => {
        //here we will get all employee data
        const url = 'https://localhost:5000/api/dishes'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const {status, message, data} = result;
                if (status !== 'SUCCESS') {
                    alert(message + status)
                } else {
                    setData(data)
                }
            })
            .catch(err => {
                console.log("Error:" + err.message)
            })
    }
    const handleSubmit = () => {
        const url = 'https://localhost:5000/api/dishes'
        const dishInfo = {dishName, dishCategory, dishType, dishPrice, dishWeight, dishDescription, dishImage}
        axios.post(url, dishInfo)
            .then(response => {
                const result = response.data;
                const {status, message, data} = result;
                if (status !== 'SUCCESS') {
                    alert(message + status)
                } else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () => {
        const url = `https://localhost:5000/api/dishes/${id}`;

        // Создайте объект, содержащий только измененные поля
        const updatedDishInfo = {};
        if (currentDishName !== dishName) {
            updatedDishInfo.dishName = dishName;
        }
        if (currentDishCategory !== dishCategory) {
            updatedDishInfo.dishCategory = dishCategory;
        }
        if (currentDishType !== dishType) {
            updatedDishInfo.dishType = dishType;
        }
        if (currentDishPrice !== dishPrice) {
            updatedDishInfo.dishPrice = dishPrice;
        }
        if (currentDishWeight !== dishWeight) {
            updatedDishInfo.dishWeight = dishWeight;
        }
        if (currentDishDescription !== dishDescription) {
            updatedDishInfo.dishDescription = dishDescription;
        }
        if (currentDishImage !== dishImage) {
            updatedDishInfo.dishImage = dishImage;
        }

        axios
            .put(url, updatedDishInfo)
            .then((response) => {
                const result = response.data;
                const {status, message} = result;
                if (status !== "SUCCESS") {
                    alert(message + status);
                } else {
                    alert(message);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDelete = () => {
        const url = `https://localhost:5000/api/dishes/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const {status, message} = result;
                if (status !== 'SUCCESS') {
                    alert(message + status)
                } else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    //call this function in useEffect
    console.log("puk" + ViewShow + RowData)
    useEffect(() => {
        GetDishesData();
    }, [])
    return (
        <div>
            <div className='row'>
                <div className="btnn">
                    <Button className="btn btn-outline-dark" onClick={() => {
                        handlePostShow()
                    }}><i className='fa fa-plu'></i>
                        Add New Dish
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Weight</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Data.map((item) =>
                            <tr key={item._id}>
                                <td>{item.dishName}</td>
                                <td>{item.dishCategory}</td>
                                <td>{item.dishType}</td>
                                <td>{item.dishPrice}</td>
                                <td>{item.dishWeight}</td>
                                <td>{item.dishDescription}</td>
                                <td>{item.dishImage}</td>
                                <td style={{minWidth: 190}}>
                                    <div className="block">
                                        <Button size='sm' className="btn btn-outline-info" onClick={() => {
                                            handleViewShow(SetRowData(item))
                                        }}>View</Button>
                                        <Button size='sm' className="btn btn-outline-success" onClick={() => {
                                            handleEditShow(SetRowData(item), setId(item._id))
                                        }}>Edit</Button>
                                        <Button size='sm' className="btn btn-outline-danger" onClick={() => {
                                            handleViewShow(SetRowData(item), setId(item._id), setDelete(true))
                                        }}>Delete</Button>
                                    </div>

                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* VIEW MODAL */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Dishes Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.dishName} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.dishCategory} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dishType} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dishPrice} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dishWeight} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dishDescription} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.dishImage} readOnly/>
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className="btn btn-outline-danger"
                                            onClick={handleDelete}>Delete</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-outline-secondary" onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* MODAL TO ADD DISH */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={handlePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Dish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input
                                    pattern="[А-Яа-яЁё\s]{5,50}" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishName(e.target.value)} placeholder="Name"
                                    ref={dishNameRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    pattern="^(Лапша|Рамэн|Тяхан)$" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishCategory(e.target.value)}
                                    placeholder="Category"
                                    ref={dishCategoryRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    pattern="^(Вег|НеВег)$" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishType(e.target.value)}
                                    placeholder="Type"
                                    ref={dishTypeRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    type="number"
                                    min="10"
                                    max="30"
                                    step="0.1"
                                    defaultValue="0"
                                    className='form-control'
                                    onChange={(e) => setDishPrice(e.target.value)}
                                    placeholder="Price"
                                    ref={dishPriceRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    type="number"
                                    min="100"
                                    max="1000"
                                    step="0.1"
                                    defaultValue="0"
                                    className='form-control'
                                    onChange={(e) => setDishWeight(e.target.value)}
                                    placeholder="Weight"
                                    ref={dishWeightRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    pattern=".{10,500}" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishDescription(e.target.value)}
                                    placeholder="Description"
                                    ref={dishDescriptionRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    pattern="^https:\/\/localhost:5000.*" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishImage(e.target.value)}
                                    placeholder="Image"
                                    ref={dishImageRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <Button
                                disabled={!isFormValid}
                                type='submit' className="btn btn-outline-danger" onClick={handleSubmit}>Add</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button id="addButton"
                                className="btn btn-outline-secondary" onClick={handlePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* MODAL FOR EDIT DISH */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Dish</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input
                                    pattern="[А-Яа-яЁё\s]{5,50}" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishName(e.target.value)}
                                    placeholder="Name"
                                    defaultValue={RowData.dishName}
                                    ref={dishNameRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Category</label>
                                <input
                                    pattern="^(Лапша|Рамэн|Тяхан)$" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishCategory(e.target.value)}
                                    placeholder="Category"
                                    defaultValue={RowData.dishCategory}
                                    ref={dishCategoryRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Type</label>
                                <input
                                    pattern="^(Вег|НеВег)$" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishType(e.target.value)}
                                    placeholder="Type"
                                    defaultValue={RowData.dishType}
                                    ref={dishTypeRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Price</label>
                                <input
                                    min="10"
                                    max="30"
                                    step="0.1"
                                    type="number"
                                    className='form-control'
                                    onChange={(e) => setDishPrice(e.target.value)}
                                    placeholder="Price"
                                    defaultValue={RowData.dishPrice}
                                    ref={dishPriceRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Weight</label>
                                <input
                                    min="100"
                                    max="1000"
                                    step="0.1"
                                    type="number"
                                    className='form-control'
                                    onChange={(e) => setDishWeight(e.target.value)}
                                    placeholder="Weight"
                                    defaultValue={RowData.dishWeight}
                                    ref={dishWeightRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Description</label>
                                <input
                                    pattern=".{10,500}" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishDescription(e.target.value)}
                                    placeholder="Description"
                                    defaultValue={RowData.dishDescription}
                                    ref={dishDescriptionRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Image</label>
                                <input
                                    pattern="^https:\/\/localhost:5000.*" required
                                    type="text"
                                    className='form-control'
                                    onChange={(e) => setDishImage(e.target.value)}
                                    placeholder="Image"
                                    defaultValue={RowData.dishImage}
                                    ref={dishImageRef}
                                    onBlur={handleValidation}
                                />
                            </div>
                            <Button
                                disabled={!isFormValid}
                                type='submit'
                                className='btn btn-warning mt-4'
                                onClick={handleEdit}>Edit</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-outline-secondary" onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
