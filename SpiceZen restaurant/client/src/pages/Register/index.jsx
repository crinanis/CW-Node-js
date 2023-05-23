import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, Alert} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {useUserAuth} from "../../context/UserAuthContext";
import "../../assets/styles/login-register.css"

export const Register = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const {signUp} = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="container">
                <div className="login-register-container">
                    <h2 className="login">Welcome to SpiceZen app!</h2>
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
                            Sign up
                        </Button>
                    </Form>
                </div>
                <div className="offer">
                    <p>Already have an account? </p>
                    <p><Link to="/login">Sign up</Link></p>
                </div>
            </div>
        </>
    );
};