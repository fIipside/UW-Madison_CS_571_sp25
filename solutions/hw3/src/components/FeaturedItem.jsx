import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

export default function FeaturedItem(props) {
    
    const [flip, setFlip] = useState(false)

    function handleFlip() {
        setFlip(!flip)
    }

    return (
        <Card>
            {/*Task 2 */}
            <Card.Img src={props.img} alt={props.description} style={{ width: "300px", height: "auto", margin: "0 auto" }}/>
            <Card.Body>
                <h2><b>{props.name}</b></h2>
                <h5><b>${props.price} per unit</b></h5>
                <Card.Text>{props.description}</Card.Text>
                <h5><b>Nutrition Facts</b></h5>
            </Card.Body>
            {/*Task 4 */}
            {flip && (
                <Table hover>
                <thead>
                    <tr>
                    <th>Calories</th>
                    <th>Fat</th>
                    <th>Carbohydrates</th>
                    <th>Protein</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{props.nutrition.calories}</td>
                    <td>{props.nutrition?.fat ?? "0g"}</td>
                    <td>{props.nutrition?.carbohydrates ?? "0g"}</td>
                    <td>{props.nutrition?.protein ?? "0g"}</td>
                    </tr>
                </tbody>
                </Table>
            )}
            {/*Task 3 */} 
            <Button onClick={handleFlip}>{flip ? "Hide Nutrition Facts" : "Show Nutrition Facts"}</Button>
        </Card>
    );
}