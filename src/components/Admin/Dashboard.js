import React from 'react';
import { Container } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';

import '../../assets/scss/dashboard.scss';

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
        <Container className="d-flex justify-content-center dashboard">
            <div className="dashboard-grid">
                <div className="dashboard-grid-item">
                    <h4 className="dashboard-grid-item-title">Users Registered</h4>
                    <div className="dashboard-grid-item-tag">
                        <PersonAddOutlinedIcon className="dashboard-grid-item-tag-icon" />
                    </div>
                </div>
                <div className="dashboard-grid-item">
                    <h4 className="dashboard-grid-item-title">Courses Added</h4>
                    <div className="dashboard-grid-item-tag">
                        <LocalLibraryOutlinedIcon className="dashboard-grid-item-tag-icon" />
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
