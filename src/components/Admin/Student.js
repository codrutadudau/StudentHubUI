import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AddStudent from '../Modals/AddStudent';
import DeleteStudent from '../Modals/DeleteStudent';

import { getAllStudentsWithName } from '../../actions/student';

import '../../assets/scss/user.scss';

export default function Student() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState(false);

    const studentUsers = useSelector(state => state.studentReducer.studentsWithName);
    
    useEffect(() => {
        dispatch(getAllStudentsWithName());
    }, []);

    const handleClick = (e, id, action) => {
        e.preventDefault();

        if (action === 'create') {
            setModalData({
                action,
            });
        } else {
            setModalData({
                action,
                id,
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
            name: "firstName",
            label: "First name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "lastName",
            label: "Last name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "identificationNumber",
            label: "Identification number",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "classroomName",
            label: "Classroom",
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
                            <EditIcon  className="user-table-icon user-table-icon--orange" onClick={e => handleClick(e, id, 'edit')}/>
                            <DeleteIcon className="user-table-icon user-table-icon--red" onClick={e => handleDeleteClick(e, id)}/>
                        </div>
                    );
                }
            }
        }
    ];

    return (
        studentUsers &&
        <Container className="d-flex justify-content-center users">
            <AddStudent
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <DeleteStudent
                show={deleteModalShow} 
                onHide={() => setDeleteModalShow(false)}
                data={deleteModalData}
            />
            <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quizzes-new">
                <AddCircleOutlineIcon className="quizzes-new-icon" />
                <span className="quizzes-new-button">Add new student</span>
            </div>
            <MUIDataTable
                className="user-table"
                title={"Students list"}
                data={studentUsers}
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

