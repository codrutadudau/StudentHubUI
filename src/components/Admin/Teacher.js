import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AddTeacher from '../Modals/AddTeacher';
import DeleteTeacher from '../Modals/DeleteTeacher';

import { getAllTeachersWithName } from '../../actions/teacher';

import '../../assets/scss/user.scss';

export default function Course() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState();
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState();

    const teacherUsers = useSelector(state => state.teacherReducer.teachersWithName);
    
    useEffect(() => {
        dispatch(getAllTeachersWithName());
    }, []);

    const handleClick = (e, id, action) => {
        e.preventDefault();

        if (action === 'create') {
            setModalData({
                action,
            });
        }

        setModalShow(true);
    };

    const handleDeleteClick = (e, id) => {
        e.preventDefault();
        
        setDeleteModalData({
            id
        });
        setDeleteModalShow(true);
    };

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (id) => {
                    return (
                        <div>
                            <DeleteIcon className="user-table-icon user-table-icon--red" onClick={e => handleDeleteClick(e, id)}/>
                        </div>
                    );
                }
            }
        }
    ];

    return (
        teacherUsers &&
        <Container className="d-flex justify-content-center users">
            <AddTeacher
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <DeleteTeacher
                show={deleteModalShow} 
                onHide={() => setDeleteModalShow(false)}
                data={deleteModalData}
            />
            <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quizzes-new">
                <AddCircleOutlineIcon className="quizzes-new-icon" />
                <span className="quizzes-new-button">Add new teacher</span>
            </div>
            <MUIDataTable
                className="user-table"
                title={"Teachers list"}
                data={teacherUsers}
                columns={columns}
                options={{
                    selectableRows: false,
                    filter: false,
                    print: false,
                }}
            />
        </Container>
    );
}

