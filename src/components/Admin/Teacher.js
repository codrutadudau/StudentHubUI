import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EnableUser from '../Modals/EnableUser';

import { getAllTeachersWithName } from '../../actions/teacher';

import '../../assets/scss/user.scss';

export default function Teacher() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);
    
    useEffect(() => {
        dispatch(getAllTeachersWithName());
    }, []);
    
    const teacherUsers = useSelector(state => state.teacherReducer.teachersWithName);

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
                            <EditIcon  className="user-table-icon user-table-icon--orange" onClick={e => handleClick(e, id)}/>
                            <DeleteIcon className="user-table-icon user-table-icon--red" />
                        </div>
                    );
                }
            }
        }
    ];

    return (
        teacherUsers &&
        <Container className="d-flex justify-content-center users">
            <EnableUser
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
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

