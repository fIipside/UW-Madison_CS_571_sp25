import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

const CS571_WITAI_ACCESS_TOKEN = "PQGIWWQSBY5MEB2D4CWYQ774PX2REISL"; // Put your CLIENT access token here.
const API_BASE = "https://cs571.org/rest/s25/hw10/";

function TextApp() {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        addMessage(Constants.Roles.Assistant, "Welcome to BadgerChat! How can I help you?");
    }

    // Task 1
    function getHelp() {
        const responses = [
            "Try to get a list of chatrooms or the latest messages; just ask me!",
            "Try out asking me about chatrooms or the latest posts!",
            "You can either get a list of chatrooms or get the latest messages; just ask me!"
        ];
        const msg = responses[Math.floor(Math.random() * responses.length)];
        addMessage(Constants.Roles.Assistant, msg);
    }

    // Task 2
    async function getChatrooms() {
        try {
            const resp = await fetch(API_BASE + "chatrooms", {
                headers: { "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7" }
            });
            const data = await resp.json();
            const responses = [
                "Here are the available chatrooms:",
                "You can visit... ",
                "These chatrooms are currently available:"
            ];
            const intro = responses[Math.floor(Math.random() * responses.length)];

            addMessage(Constants.Roles.Assistant, `${intro} ${data.join(", ")}`);
        } catch (err) {
            addMessage(Constants.Roles.Assistant, "Sorry, I couldn't load the chatrooms.");
        }
    }

    // Task 3
    async function getMessages(entities) {
        const number = entities?.number?.[0]?.value || 1;
        const chatroom = entities?.chatroom?.[0]?.value;

        let url = API_BASE + "messages?";
        if (chatroom) url += "chatroom=" + encodeURIComponent(chatroom) + "&";
        url += "num=" + number;

        try {
            const resp = await fetch(url, {
                headers: { "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7" }
            });
            const data = await resp.json();

            const responses = [
                "Here are the latest messages:",
                "Here's what people have been saying:",
                "These are the most recent posts:"
            ];
            const intro = responses[Math.floor(Math.random() * responses.length)];

            const combinedMessages = data.messages.map(msg =>
                `${msg.poster} created a post titled '${msg.title}' in ${msg.chatroom} saying '${msg.content}'`
            ).join(" | ");

            addMessage(Constants.Roles.Assistant, `${intro} ${combinedMessages}`);
        } catch (err) {
            addMessage(Constants.Roles.Assistant, "Sorry, I couldn't fetch the messages.");
        }
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        setIsLoading(true);
        if(input) {
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = "";
            const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(input), {
                headers: {
                    "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
                }
            })
            const data = await resp.json();
            console.log(data);

            const matchedName = data.intents[0]?.name;
            if (!matchedName) {
                addMessage(Constants.Roles.Assistant, "I'm sorry, I don't understand!");
            } else {
                // Task 1
                if (matchedName === "get_help") {
                    getHelp();
                }
                // Task 2
                else if (matchedName === "get_chatrooms") {
                    await getChatrooms();
                }
                // Task 3
                else if (matchedName === "get_messages") {
                    await getMessages(data.entities);
                }
                else {
                    addMessage(Constants.Roles.Assistant, "I understood your intent, but I don't know how to respond yet.");
                }
            }
        }
        setIsLoading(false);
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user" or "assistant"
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
