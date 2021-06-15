import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import map from 'lodash/map';
import  EditIcon from '@material-ui/icons/Edit';
import  DeleteIcon from '@material-ui/icons/Delete';

import { getAllUsers } from '../../actions/user';

export default function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const handleClick = (e, id) => {
        e.preventDefault();

        history.push('/user/' + id);
    };

    const users = useSelector(state => state.userReducer.users);
    const className = "user-table";

    return (
        <div className="page-content">
            <table className={`table table-striped ${className}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        map(users, (user, value) => {
                            return (
                                <tr key={value}>
                                    <th scope="row">{value + 1}</th>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>
                                        <EditIcon onClick={e => handleClick(e, value + 1)} className={`${className}-icon`} />
                                        <DeleteIcon className={`${className}-icon`} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
