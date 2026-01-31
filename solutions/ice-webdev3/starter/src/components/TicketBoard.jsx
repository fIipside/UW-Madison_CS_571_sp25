import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/ice/tickets', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: ticketData,
                inprogress: [],
                done: []
            });
        })
    }, []);

    function move(from, to, id) {
        // TODO move the ticket
        console.log("MOVE", from, to, id);
        setTicketLanes(oldLanes => {
            let oldLane = oldLanes[from];
            let toLane = oldLanes[to];
            let tic = oldLane.find(t => t.id === id);

            const newLanes = {...oldLanes};
            newLanes[from] = oldLane.filter(t => t.id !== id); // remove ticket from old lane...
            newLanes[to] = [...toLane, tic]; // and place it in the new lane!

            return newLanes;
        })
    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane
                        key={laneName}
                        status={laneName}
                        tickets={ticketLanes[laneName]}
                        move={move}
                    />
                })
            }
        </Container>
    </div>
}

export default TicketBoard;