// Task 6
import { Card, Button } from "react-bootstrap";

export default function BadgerBudBasketItem({ buddy, onUnselect, onAdopt }) {
    const imgUrl = `https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;

    const handleUnselect = () => {
        alert(`${buddy.name} has been removed from your basket!`);
        onUnselect(buddy.id);
    }

    const handleAdopt = () => {
        alert(`Thank you for adopting ${buddy.name}! 💕😸`);
        onAdopt(buddy.id)
    }

    return (
        <Card className="mb-3">
            <Card.Img 
                variant="top" 
                src={imgUrl} 
                alt={`A picture of ${buddy.name}`} 
                // Design Requirements
                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
            />
            <Card.Body>
                <h2>{buddy.name}</h2>
                <Button variant="secondary" className="me-2" onClick={handleUnselect}>
                    Unselect
                </Button>
                <Button variant="success" onClick={handleAdopt}>
                    💕 Adopt
                </Button>
            </Card.Body>
        </Card>
    );
}

