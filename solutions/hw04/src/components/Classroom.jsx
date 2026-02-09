import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    // Task 6
    const [searchName, setSearchName] = useState('');
    const [searchMajor, setSearchMajor] = useState('');
    const [searchInterest, setSearchInterest] = useState('');
    
    // Task 8
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 24;

    // Task 1
    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(r => r.json())
        .then(d => {
            setStudents(d);
            console.log(d);
        })
    }, [])

    // Task 6: filtering students.
    const filteredStudents = students.filter(s => {
        const nameQuery = searchName.trim().toLowerCase();
        if (nameQuery && !`${s.name.first} ${s.name.last}`.toLowerCase().includes(nameQuery)) {
            return false;
        }

        const majorQuery = searchMajor.trim().toLowerCase();
        if (majorQuery && !s.major.toLowerCase().includes(majorQuery)) {
            return false;
        }

        const interestQuery = searchInterest.trim().toLowerCase();
        if (interestQuery && !s.interests.some(i => i.toLowerCase().includes(interestQuery))) {
            return false;
        }

        return true;
    })

    // Task 8: reset to page 1 when search changes.
    useEffect(() => {
        setCurrentPage(1);
    }, [searchName, searchMajor, searchInterest])
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                /* Task 6 */
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                /* Task 6 */
                value={searchMajor}
                onChange={e => setSearchMajor(e.target.value)}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                /* Task 6 */
                value={searchInterest}
                onChange={e => setSearchInterest(e.target.value)}
            />
            <br />
            <Button 
                variant="neutral"
                /* Task 7 */
                onClick={() => {
                    setSearchName('');
                    setSearchMajor('');
                    setSearchInterest('');
                }}
            >
                Reset Search
            </Button>
        </Form>
        {/* Task 2 */}
        <p>There are {filteredStudents.length} student(s) matching your search.</p>
        <Container fluid>
            <Row>
                { /* TODO Students go here! */ /* Task 3, 4, 8 */
                    filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage).map(s => (<Col xs={12} sm={12} md={6} lg={4} xl={3} key={s.id}>
                        <Student {...s}/>
                    </Col>))
                }
            </Row>
        </Container>

        {/* Task 8 */}
        <Pagination className="justify-content-center mt-3">
            {/* Task 9 */}
            <Pagination.Item
                key="Previous"
                disabled={currentPage === 1 || totalPages === 0}
                onClick={() => setCurrentPage(p => p - 1)}
            >
                Previous
            </Pagination.Item>
            
            {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}

            {/* Task 9 */}
            <Pagination.Item
                key="Next"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => p + 1)}
            >
                Next
            </Pagination.Item>

        </Pagination>
    </div>

}

export default Classroom;