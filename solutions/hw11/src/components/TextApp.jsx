import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

function TextApp(props) {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    // Task 4
    const [messages, setMessages] = useState(() => {
        const stored = localStorage.getItem("messages");
        return stored ? JSON.parse(stored) : [];
    });
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        if (messages.length === 0) {
            addMessage(Constants.Roles.Assistant, props.persona.initialMessage);
        }
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        if (!input || isLoading) return;

        // Task 1
        setIsLoading(true);

        // Add user message
        const newMessages = [...messages, {
            role: Constants.Roles.User,
            content: input
        }];

        // Add a placeholder assistant message that we will update in real time
        setMessages([...newMessages, {
            role: Constants.Roles.Assistant,
            content: ""
        }]);
        inputRef.current.value = "";

        // Task 2
        const messagesToSend = [
            {
                role: Constants.Roles.Developer,
                content: props.persona.prompt
            },
            ...newMessages
        ];

        const resp = await fetch(
            "https://cs571-hw11-server.netlify.app/.netlify/edge-functions/completions-stream",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "YOUR API KEY"
                },
                body: JSON.stringify(messagesToSend)
            }
        );

        const reader = resp.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let unparsedLine = "";
        let constructedString = "";
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter(line => line.trim() !== "");
                for (const line of lines) {
                    try {
                        const deltaObj = JSON.parse(unparsedLine + line);
                        unparsedLine = "";
                        constructedString += deltaObj.delta;

                        setMessages(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                role: Constants.Roles.Assistant,
                                content: constructedString
                            };
                            return updated;
                        });
                    } catch (e) {
                        unparsedLine += line;
                    }
                }
            }
        }

        setIsLoading(false);
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user", "assistant", or "developer"
     * @param {*} content The content of the message
     */
    function addMessage(role, content) {
        setMessages(o => [...o, {
            role: role,
            content: content
        }]);
    }

    useEffect(() => {
        handleWelcome();
    }, []);

    // Task 4
    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);

    return (
        <div className="app">
            <TextAppMessageList messages={messages}/>
            {isLoading ? <BeatLoader color="#36d7b7"/> : <></>}
            <div className="input-area">
                <Form className="inline-form" onSubmit={handleSend}>
                    <Form.Control
                        ref={inputRef}
                        style={{ marginRight: "0.5rem", display: "flex" }}
                        placeholder="Type a message..."
                        aria-label='Type and submit to send a message.'
                    />
                    <Button type='submit' disabled={isLoading}>Send</Button>
                </Form>
            </div>
        </div>
    );
}

export default TextApp;
