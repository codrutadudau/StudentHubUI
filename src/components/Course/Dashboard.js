import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';


export default function Dashboard(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        switch (props.role) {
            case process.env.ROLE_ADMIN:
                break;
            case process.env.ROLE_TEACHER:
                console.log(1);
                break;
        }
    }, []);

    return (
        <Container className="d-flex justify-content-center">
            Course dashboard
        </Container>
    );
}
