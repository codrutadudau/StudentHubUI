import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

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

    const className = "user-table";
    return (
        <div className="page-content">
            
        </div>
    );
}
