import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EnableUser from '../Modals/EnableUser';

import { getAllCoursesWithTeacherName } from '../../actions/course';

import '../../assets/scss/user.scss';

export default function Course() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);
    
    useEffect(() => {
        dispatch(getAllCoursesWithTeacherName());
    }, []);
    
    const courses = useSelector(state => state.courseReducer.coursesWithTeacherName);

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
            name: "teacherName",
            label: "Teacher",
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
                            <EditIcon  className="user-table-icon user-table-icon--orange" onClick={e => handleClick(e, id)}/>
                            <DeleteIcon className="user-table-icon user-table-icon--red" />
                        </div>
                    );
                }
            }
        }
    ];

    return (
        courses &&
        <Container className="d-flex justify-content-center users">
            <EnableUser
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <MUIDataTable
                className="user-table"
                title={"Courses list"}
                data={courses}
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

