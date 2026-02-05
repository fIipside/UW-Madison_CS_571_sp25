import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot-messages
export default function Mascot(props) {

    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/ice/mascot", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setName(data.name);
            setSlogan(data.quote);
            setImg(data.imgSrc);
        })
    }, []);

    function handlePress() {
        Alert.alert("Hello!", "Hello world!");
    }

    return <View>
        {
            name ? <Pressable onPress={handlePress}>
                <Image style={{width: 200, height: 200}} source={{uri: img}}></Image>
                <Text style={{fontSize: 28}}>{name}</Text>
                <Text style={{fontSize: 18}}>{slogan}</Text>
            </Pressable> : <Text>Still loading...</Text>
        }
    </View>
}