// Task 2
import { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";

export default function BadgerBudSummary({ buddy, onSave }) {
    const getImgUrl = (imgId) => `https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${imgId}`;
    // Task 4
    const [showMore, setShowMore] = useState(false);

    // Task 5
    const handleSave = () => {
        alert(`${buddy.name} has been added to your basket!`);
        onSave(buddy.id);
    }

    return (
        <Card className="mb-3">
            {showMore ? (
                /* Task 10 */
                <Carousel>
                    {buddy.imgIds.map((imgId, index) => (
                        <Carousel.Item key={index}>
                            <img 
                                className="d-block w-100" 
                                src={getImgUrl(imgId)} 
                                alt={`A picture of ${buddy.name}`} 
                                // Design Requirements
                                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <Card.Img 
                    variant="top" 
                    src={getImgUrl(buddy.imgIds[0])} 
                    alt={`A picture of ${buddy.name}`} 
                    // Design Requirements
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
            )}
            
            <Card.Body>
                <h2>{buddy.name}</h2>
                {/* Task 4 */}
                {showMore && (
                    <>
                        <p>{buddy.gender}</p>
                        <p>{buddy.breed}</p>
                        <p>{buddy.age} old</p>
                        {buddy.description && (
                            <p>{buddy.description}</p>
                        )}
                    </>
                )}
                <Button variant="primary" className="me-2" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show Less" : "Show More"}
                </Button>
                <Button variant="secondary" onClick={handleSave}>
                    ❤️ Save
                </Button>
            </Card.Body>
        </Card>
    );
}
