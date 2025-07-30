import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from "react-bootstrap";

interface AdminListColsProperties{
    data?: string[];
}

const AdminListCols: React.FC<AdminListColsProperties> = ({
    // default values
    data = [],

}) => {
    return (
        <Container fluid className="admin-list-cols">
            <Row>
                {data.map((item, index) => (
                    <Col key={index} className="m-2">{item}</Col>
                ))}
                <Col className="admin-button">
                </Col>
            </Row>
        </Container>
    )
}

export default AdminListCols;