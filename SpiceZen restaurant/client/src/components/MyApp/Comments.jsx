import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import {useUserAuth} from "../../context/UserAuthContext";

import "../../assets/styles/comments.css"

export const socket = io("https://localhost:5000");

export const Comments = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', () => {
            console.log("connected")                // Handle the case when the email is undefined or null
            // You can choose to emit a default username or display an error message
        });

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);



        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });


        // Обработчик получения нового комментария от сервера
        socket.on('newComment', (comment) => {
            setComments((prevComments) => [...prevComments, comment]);
        });

        // Очистка подписки при размонтировании компонента
        return () => {
            socket.off('newComment');
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    const submitComment = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            // Отправка нового комментария на сервер
            socket.emit('newComment', newComment);
            setNewComment('');
        }
    };

    return (
        <div className="comment-app">
            <h2>Комментарии</h2>
            <ul className="comment-list">
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <form onSubmit={submitComment}>
                <input
                    className="comment-input"
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Введите комментарий"
                />
                <button className="submit-button" type="submit">Отправить</button>
            </form>
        </div>
    );
}
