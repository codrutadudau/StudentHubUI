import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AddClassroom from '../Modals/AddClassroom';
import DeleteClassroom from '../Modals/DeleteClassroom';

import { getClassrooms } from '../../actions/classroom';

import '../../assets/scss/user.scss';

export default function Course() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState();
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState();

    const classrooms = useSelector(state => state.classroomReducer.classrooms);
    
    useEffect(() => {
        dispatch(getClassrooms());
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
                            <EditIcon  className="user-table-icon user-table-icon--orange" onClick={e => handleClick(e, id, 'edit')}/>
                            <DeleteIcon className="user-table-icon user-table-icon--red" onClick={e => handleDeleteClick(e, id)}/>
                        </div>
                    );
                }
            }
        }
    ];

    return (
        classrooms &&
        <Container className="d-flex justify-content-center users">
            <AddClassroom
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <DeleteClassroom
                show={deleteModalShow} 
                onHide={() => setDeleteModalShow(false)}
                data={deleteModalData}
            />
            <div onClick={e => handleClick(e, null, 'create')} className="btn btn-success quizzes-new add-new-course-min-width">
                <AddCircleOutlineIcon className="quizzes-new-icon" />
                <span className="quizzes-new-button">Add new classroom</span>
            </div>
            <MUIDataTable
                className="user-table"
                title={"Classrooms list"}
                data={classrooms}
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
