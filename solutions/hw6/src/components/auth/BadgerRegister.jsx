import React, { useState, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerRegister() {

    // TODO Create the register component.
    // Task 4
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    // Task 6
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleRegister = () => {
        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        if (!/^\d{7}$/.test(pin)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }

        if (pin !== confirmPin) {
            alert("Your pins do not match!");
            return;
        }

        fetch('https://cs571.org/rest/s25/hw6/register', {
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
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.status === 200) {
                alert("The registration was successful!");
                // Task 6
                setLoginStatus({ username });
                sessionStorage.setItem("loginStatus", JSON.stringify({ username }));
                navigate("/");
            }
        });
    }

    return <>
        <h1>Register</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control id="username" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
        <br/>
        <Form.Label htmlFor="pin">Password</Form.Label>
        <Form.Control id="pin" value={pin} type="password" onChange={(e) => setPin(e.target.value)}></Form.Control>
        <br/>
        <Form.Label htmlFor="confirmPin">Repeat Password</Form.Label>
        <Form.Control id="confirmPin" value={confirmPin} type="password" onChange={(e) => setConfirmPin(e.target.value)}></Form.Control>
        <br/>
        <Button onClick={handleRegister}>Register</Button>
    </>
}
