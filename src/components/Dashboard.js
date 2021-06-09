import React from 'react';
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ChartistGraph from 'react-chartist';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';

import '../assets/scss/dashboard.scss';

export default function Dashboard() {

    const navbarItems = () => {
        return ([
            {
                title: 'Home',
                path: '/dashboard',
                icon: <HomeIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Users',
                path: '/users',
                icon: <PeopleIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Quizzes',
                path: '/quizzes',
                icon: <FormatListBulletedIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Questions',
                path: '/questions',
                icon: <QuestionAnswerIcon />,
                cName: 'nav-text'
            },
        ]);
    }

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
  
    var type = 'Line'

    return (
        <>
            <nav className='navbar-left'>
                <ul className='nav-menu-items'>
                    {
                        map(navbarItems(), (item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
            <div className="page-content">
                <Container className="d-flex justify-content-center dashboard">
                    <div className="dashboard-grid">
                        <div className="dashboard-grid-item">
                            <h4 className="dashboard-grid-item-title-1">Users Registered</h4>
                            <div className="dashboard-grid-item-2-1">
                                <span class="MuiSvgIcon-root"><PersonAddOutlinedIcon/></span>
                            </div>
                        </div>
                        <div className="dashboard-grid-item">
                            <h4 className="dashboard-grid-item-title-2">Courses Added</h4>
                            <div className="dashboard-grid-item-2-2">
                                <span class="MuiSvgIcon-root"><LocalLibraryOutlinedIcon/></span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-graph-1-container">
                        <ChartistGraph
                            className="dashboard-graph-1-container-users"
                            data={data}
                            options={options}
                            type={type} 
                        />
                        <h4 className="dashboard-graph-1-container-title">Users Registered</h4>
                        <span className="dashboard-graph-1-container-subtitle">2020-2021 Academic Year</span>
                    </div>
                </Container>
            </div>
            <div className="navbar-right">

            </div>
        </>
    );
}