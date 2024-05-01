import React from 'react';
import { Outlet } from 'react-router';

const WithoutNavbar: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    );

}

export default WithoutNavbar