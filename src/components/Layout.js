import React from 'react';
import Header from './Header/Header';

const Layout = ({ component: Component, sidebar: Sidebar }) => {
    return (
        <div className="layout">
            <Header />
            <div className="layout-body">
                <section className="layout-content">
                    <Component />
                </section>
                <Sidebar />
                <div className="layout-right-sidebar sidebar">
                    <div>
                    
                    </div>
                </div>
            </div>
            <footer>
               Footer
            </footer>
        </div>
    )
}

export default Layout;
