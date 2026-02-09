import React, { useRef, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    // TODO Create the login component.
    // Task 5
    const usernameRef = useRef();
    const pinRef = useRef();
    // Task 6
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleLogin = () => {
        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        if (!/^\d{7}$/.test(pin)) {
            alert("Your pin is a 7-digit number!");
            return;
        }

        fetch('https://cs571.org/rest/s25/hw6/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.status === 200) {
                alert("The login was successful!");
                setLoginStatus({ username });
                sessionStorage.setItem("loginStatus", JSON.stringify({ username }));
                navigate("/");
            }
        });
    }

    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control id="username" ref={usernameRef}></Form.Control>
        <br/>
        <Form.Label htmlFor="pin">Password</Form.Label>
        <Form.Control id="pin" type="password" ref={pinRef}></Form.Control>
        <br/>
        <Button onClick={handleLogin}>Login</Button>
    </>
}
