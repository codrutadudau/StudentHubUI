import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EnableUser from '../Modals/EnableUser';

import { getAllUsers } from '../../actions/user';

import '../../assets/scss/user.scss';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);
    
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    
    const users = useSelector(state => state.userReducer.users);

    const handleClick = (e, id) => {
        e.preventDefault();

        history.push('/user/' + id);
    };

    const handleEnable = (e, id) => {
        setModalShow(true);
        setModalData(id);
    }

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
                sort: false,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phoneNumber",
            label: "Phone number",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "enabled",
            label: "Enabled",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (enabled) => {
                    return (
                        enabled === true ? 1 : 0
                    );
                }
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
                            <VerifiedUserIcon className="user-table-icon user-table-icon--green" onClick={e => handleEnable(e, id)} />
                            <EditIcon  className="user-table-icon user-table-icon--orange" onClick={e => handleClick(e, id)}/>
                            <DeleteIcon className="user-table-icon user-table-icon--red" />
                        </div>
                    );
                }
            }
        }
    ];

    return (
        users &&
        <Container className="d-flex justify-content-center users">
            <EnableUser
                show={modalShow} 
                onHide={() => setModalShow(false)}
                data={modalData}
            />
            <MUIDataTable
                className="user-table"
                title={"Users list"}
                data={users}
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
