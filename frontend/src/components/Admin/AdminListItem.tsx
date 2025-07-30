import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Row } from "react-bootstrap";

interface AdminListItemProperties{
    title?: string;
    data?: string[];
    viewText?: string;
    viewLink?: string;
    approveText?: string;
    approveLink?: string;
}

const AdminListItem: React.FC<AdminListItemProperties> = ({
    // default values
    title,
    data = [],
    viewText = "View",
    viewLink = "",
    approveText = "Approve",
    approveLink = "",
}) => {
    return (
        <Container fluid className="p-2 mt-2 admin-list-item">
            <Row>
                <Col className="m-2 item-title">{title}</Col>
                {data.map((item, index) => (
                    <Col key={index} className="m-2">{item}</Col>
                ))}
                <Col className="admin-button">
                    {approveLink && ( // Render only if approveLink is not empty
                        <Button className="mx-1 btn-success" href={approveLink}>
                            {approveText}
                        </Button>
                    )}
                    <Button href={viewLink}>{viewText}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminListItem;