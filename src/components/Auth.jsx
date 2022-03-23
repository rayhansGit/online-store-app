/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Auth = ({ authRoles }) => {
    const user = useSelector(state => state.auth)
    const navigate = useNavigate()
    if (user.user != undefined) {
        if (authRoles.indexOf(user.user.role) != -1) {
            return (
                <><Outlet /></>
            );
        } else {
            navigate("/", { replace: true });
        }
    }


    return <></>
};

export default Auth;
