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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
