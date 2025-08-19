import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function Recipe(props) {

    const [likes, setLikes] = useState(0);

    function handleLike() {
        setLikes(likes + 1);
        alert("I increased the number of likes!")
    }

    // Card style is copied from the solution
    return <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}> 
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img.location} alt={props.img.description}/>
                <h2>{props.name}</h2>
                <p>by {props.author} | <strong>{likes} likes</strong></p>
                <p>described as {props.keywords.join(", ")}</p>
                <Button onClick={handleLike}>Like this recipe</Button>
            </> : <p>Loading...</p>
        }
    </Card>
}