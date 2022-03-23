/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationsActions';

const Notification = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeNotification())
    }, [])
    const notification = useSelector(state => state.notification.notification);
    
    if (notification != undefined) {
        if (notification.isSuccess) {
            return (<span className='text-white bg-success text-center p-4'>{notification.message}</span>)
        }

        else {
            if (notification.message != undefined) {
                return (<span className='text-white bg-danger text-center p-4'>{notification.message}</span>)
            }
            return <><span data-testid="no-notification-component">No new notification</span></>
        }

    }

    return <><span data-testid="no-notification-component">No new notification</span></>
};

export default Notification;
