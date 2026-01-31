// Task 6
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudBasketItem from "./BudgetBudBasketItem";

export default function BadgerBudsBasket() {
    const buds = useContext(BadgerBudsDataContext);
    const [savedIds, setSavedIds] = useState([]);
    // Task 8
    const [adoptedIds, setAdoptedIds] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adopted = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
        setSavedIds(saved);
        setAdoptedIds(adopted);
    }, []);

    // Task 7
    const handleUnselect = (id) => {
        const updated = savedIds.filter(savedId => savedId !== id);
        setSavedIds(updated);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updated));
    };

    // Task 8
    const handleAdopt = (id) => {
        const newSaved = savedIds.filter(savedId => savedId !== id);
        const newAdopted = [...adoptedIds, id];

        setSavedIds(newSaved);
        setAdoptedIds(newAdopted);

        sessionStorage.setItem("savedCatIds", JSON.stringify(newSaved));
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(newAdopted));
    };

    const savedBuds = buds.filter(b => savedIds.includes(b.id) && !adoptedIds.includes(b.id));

    return (
        <div>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {savedBuds.length === 0 ? (/* Task 9 */ <p>You have no buds in your basket!</p>) : (
                <Container fluid>
                    <Row>
                        {savedBuds.map(buddy => (
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={buddy.id}>
                                <BadgerBudBasketItem 
                                    buddy={buddy}
                                    onUnselect={handleUnselect}
                                    onAdopt={handleAdopt}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </div>
    );
}
