import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import  EditIcon from '@material-ui/icons/Edit';
import  DeleteIcon from '@material-ui/icons/Delete';

import { getAllUsers } from '../../actions/user';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    
    const users = useSelector(state => state.userReducer.users);

    const handleClick = (e, id) => {
        e.preventDefault();

        history.push('/user/' + id);
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
            name: "id",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (id) => {
                    return (
                        <div>
                            <EditIcon onClick={(e) => handleClick(e, id)}/>
                            <DeleteIcon />
                        </div>
                    );
                }
            }
        }
    ];

    return (
        users &&
        <div className="page-content">
            <MUIDataTable
                className="user-table"
                title={"Users list"}
                data={users}
                columns={columns}
            />
        </div>
    );
}
