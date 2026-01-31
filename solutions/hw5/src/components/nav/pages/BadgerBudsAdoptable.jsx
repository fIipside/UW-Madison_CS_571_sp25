import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "./BadgerBudSummary";

export default function BadgerBudsAdoptable() {
    const buddies = useContext(BadgerBudsDataContext);
    // Task 5
    const [savedIds, setSavedIds] = useState([]);
    // Task 7
    const [adoptedIds, setAdoptedIds] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adopted = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
        setSavedIds(saved);
        setAdoptedIds(adopted);
    }, []);

    const handleSave = (id) => {
        const newSaved = [...savedIds, id];
        setSavedIds(newSaved);
        sessionStorage.setItem("savedCatIds", JSON.stringify(newSaved));
    };

    const availableBuds = buddies.filter(b => !savedIds.includes(b.id) && !adoptedIds.includes(b.id));

    return (
        <div>
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>

            {availableBuds.length === 0 ? (/* Task 9 */ <p>No buds are available for adoption!</p>) :
                (/* Task 2 */
                <Container fluid>
                    <Row>
                        {availableBuds.map(buddy => (
                            /* Task 3 */
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={buddy.id}>
                                <BadgerBudSummary buddy={buddy} onSave={handleSave} />
                            </Col>
                        ))}
                    </Row>
                </Container>)
            }
        </div>
    );
}
