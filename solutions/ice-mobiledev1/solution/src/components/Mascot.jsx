import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot-messages
export default function Mascot(props) {

    const [bio, setBio] = useState({
        name: "Mascot Name",
        quote: "Some inspiring quote...",
        imgSrc: undefined
    });

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/ice/mascot", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => setBio(data))
    }, []);

    function doSpeak() {
        fetch("https://cs571.org/rest/s25/ice/mascot-messages", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(resp => Alert.alert("Message received!", resp.msg))
    }

    return <Pressable onPress={doSpeak}>
        {
            bio.imgSrc ? <Image style={{width: 250, height: 250}} source={{uri: bio.imgSrc}}/> : <></>
        }
        <Text style={{fontSize: 48}}>{bio.name}</Text>
        <Text style={{fontSize: 24}}>{bio.quote}</Text>
    </Pressable>
}