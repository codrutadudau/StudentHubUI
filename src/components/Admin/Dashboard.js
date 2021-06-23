import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import { useSelector, useDispatch } from 'react-redux';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import map from 'lodash/map';

import { getAllUsers } from '../../actions/user';
import { getAllCourses } from '../../actions/course';

import '../../assets/scss/dashboard.scss';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState();
    const [lastAddedCourses, setLastAddedCourses] = useState();
    
    const users = useSelector(state => state.userReducer.users);
    const courses = useSelector(state => state.courseReducer.courses);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllCourses());
    }, []);

    useEffect(() => {
        if (users) {
            setLastRegisteredUsers(users.reverse());
        }
    }, [users]);

    useEffect(() => {
        if (courses) {
            setLastAddedCourses(courses.reverse());
        }
    }, [courses]);

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
          [5, 2, 4, 2, 0]
        ],
      };
  
    const options = {
        width: '600px',
        height: '250px',
    };
  
    var type = 'Line';

    return (
        <Container className="d-flex justify-content-center dashboard">
            <div className="dashboard-grid">
                <div className="dashboard-grid-item">
                    <h4 className="dashboard-grid-item-title">Users Registered</h4>
                    <div className="dashboard-grid-item-tag">
                        <PersonAddOutlinedIcon className="dashboard-grid-item-tag-icon" />
                    </div>
                    <div className="dashboard-grid-item-registered-users">
                        {
                            lastRegisteredUsers &&
                            map(lastRegisteredUsers, (user, index) => {
                                if (index < 5) {
                                    return (
                                        <p key={index} className="dashboard-grid-item-registered-users-item">{user.firstName} {user.lastName}</p>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className="dashboard-grid-item">
                    <h4 className="dashboard-grid-item-title">Courses Added</h4>
                    <div className="dashboard-grid-item-tag">
                        <LocalLibraryOutlinedIcon className="dashboard-grid-item-tag-icon" />
                    </div>
                    <div className="dashboard-grid-item-added-courses">
                        {
                            lastAddedCourses &&
                            map(lastAddedCourses, (course, index) => {
                                if (index < 5) {
                                    return (
                                        <p key={index} className="dashboard-grid-item-added-courses-item">{course.name}</p>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div className="dashboard-graph">
                <div className="dashboard-graph-container">
                    <ChartistGraph
                        className="dashboard-graph-container-users"
                        data={data}
                        options={options}
                        type={type}
                    />
                </div>
            </div> */}
        </Container>
    );
}
