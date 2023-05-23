import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import '../../assets/styles/controldish.css';

export const OrderControl = () => {
    const [viewShow, setViewShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState('');

    const handleViewShow = (item) => {
        setSelectedOrder(item);
        setViewShow(true);
    };

    const handleViewClose = () => {
        setViewShow(false);
    };

    const handleConfirm = (id) => {
        const url = `https://localhost:5000/api/summary/${id}`;

        // Подтвердить бронь
        axios
            .put(url, {isConfirmed: true})
            .then((response) => {
                const result = response.data;
                const {status, message} = result;
                if (status !== 'SUCCESS') {
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


    const handleDelete = (id) => {
        const url = `https://localhost:5000/api/summary/${id}`;
        axios
            .delete(url)
            .then((response) => {
                const result = response.data;
                const {status, message} = result;
                if (status !== 'SUCCESS') {
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

    const GetSummaryData = () => {
        const url = 'https://localhost:5000/api/summary';
        axios
            .get(url)
            .then((response) => {
                const result = response.data;
                const {status, message, data} = result;
                if (status !== 'SUCCESS') {
                    alert(message + status);
                } else {
                    setOrders(data);
                }
            })
            .catch((err) => {
                console.log('Error: ' + err.message);
            });
    };

    useEffect(() => {
        GetSummaryData();
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                        <tr>
                            <th>Order</th>
                            <th>Name of person</th>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Total Price</th>
                            <th>isConfirmed</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((item) => (
                            <tr key={item._id}>
                                <td>{item.order.chosenDishes.map((dish) => dish.name).join(', ')}</td>
                                <td>{item.reservation.name}</td>
                                <td>{item.reservation.date ? item.reservation.date.substring(0, 10) : ''}</td>
                                <td>{item.reservation.time}</td>
                                <td>
                                    {item.order.chosenDishes.reduce((totalPrice, dish) => totalPrice + dish.price, 0)}
                                </td>
                                <td>{item.isConfirmed ? 'Confirmed' : 'Not Confirmed yet'}</td>
                                <td style={{minWidth: 190}}>
                                    <div className='block'>
                                        <Button
                                            size='sm'
                                            className='btn btn-outline-info'
                                            onClick={() => handleViewShow(item)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            size='sm'
                                            className='btn btn-outline-dark'
                                            onClick={() => {
                                                handleViewShow(item);
                                                setId(item._id);
                                                setConfirm(true);
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            size='sm'
                                            className='btn btn-outline-danger'
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* VIEW/DELETE MODAL */}
            <div className='model-box-view'>
                <Modal show={viewShow} onHide={handleViewClose} backdrop='static' keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Dishes Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={selectedOrder?.order.chosenDishes.map((dish) => dish.name).join(', ')}
                                    readOnly
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    type='email'
                                    className='form-control'
                                    value={selectedOrder?.reservation.name}
                                    readOnly
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <input type='text' className='form-control' value={selectedOrder?.user} readOnly/>
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={selectedOrder?.isConfirmed ? 'Confirmed' : 'Not Confirmed yet'}
                                    readOnly
                                />
                            </div>
                            {confirm && (
                                <Button
                                    size='sm'
                                    disabled={selectedOrder?.isConfirmed}
                                    className='btn btn-outline-warning'
                                    onClick={() => {
                                        handleConfirm(id);
                                    }}
                                >
                                    Confirm
                                </Button>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-outline-secondary' onClick={handleViewClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
