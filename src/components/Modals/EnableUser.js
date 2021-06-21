import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { enableUser, getUserById, getAllUsers } from '../../actions/user';

export default function EnableUser(props) {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        if (props.data) {
            dispatch(getUserById(props.data));
        }
    }, [props]);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    const handleClick = e => {
        dispatch(enableUser(currentUser.id)).then(() => {
            dispatch(getAllUsers());
        });

        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="enable-user"
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Enable User
            </Modal.Title>
        </Modal.Header>
        {
            currentUser &&
            <Modal.Body>
                <p>
                    Do you want to enable the user with the email <span className="quiz-modal-name">{currentUser.email}</span>?
                </p>
            </Modal.Body>
        }
        <Modal.Footer>
            <Button className="btn btn-success" onClick={handleClick}>Yes</Button>
            <Button className="btn btn-danger" onClick={props.onHide}>No</Button>
        </Modal.Footer>
        </Modal>
    );
}
