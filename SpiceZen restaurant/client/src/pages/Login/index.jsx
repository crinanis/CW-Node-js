import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Alert} from "react-bootstrap";
import {Button} from "react-bootstrap";
import GoogleButton from "react-google-button";
import {useUserAuth} from "../../context/UserAuthContext";
import "../../assets/styles/login-register.css"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {logIn, googleSignIn, user} = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <div className="login-register-container">
                    <h2 className="login">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-group" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="form-group" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="btn btn-outline-dark" type="Submit">
                            Log In
                        </Button>
                    </Form>
                    <hr />
                    <div>
                        <GoogleButton
                            className="g-btn"
                            type="dark"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                </div>
                <div className="offer">
                    <p>Don't have an account?</p>
                    <p><Link to="/register">Sign up</Link></p>
                </div>
            </div>
        </>
    );
};