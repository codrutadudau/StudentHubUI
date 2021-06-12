import React from 'react';
import { Container } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';

import '../assets/scss/dashboard.scss';

export default function Dashboard() {

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
        <>
            <Container className="d-flex justify-content-center dashboard">
                <div className="dashboard-grid">
                    <div className="dashboard-grid-item">
                        <h4 className="dashboard-grid-item-title-1">Users Registered</h4>
                        <div className="dashboard-grid-item-2-1">
                            <span className="MuiSvgIcon-root"><PersonAddOutlinedIcon/></span>
                        </div>
                    </div>
                    <div className="dashboard-grid-item">
                        <h4 className="dashboard-grid-item-title-2">Courses Added</h4>
                        <div className="dashboard-grid-item-2-2">
                            <span className="MuiSvgIcon-root"><LocalLibraryOutlinedIcon/></span>
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
        </>
    );
}