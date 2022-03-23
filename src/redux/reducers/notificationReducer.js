/** @format */

import { NEW_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

/**
 * Implement notificationReducer that handles following cases:
 * 1) NEW_NOTIFICATION: adds the new notification to the state.
 * 2) REMOVE_NOTIFICATION: removes the notification.
 * @param {Object} state old state of notification.
 * @param {Object} action the action that calls the reducer.
 * @returns {Object} new state for notification
 */
const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_NOTIFICATION:
            let notification = {
                type: action.type,
                message: action.message,
                isSuccess: action.isSuccess
            }
            return { ...state, notification }
        case REMOVE_NOTIFICATION:
            let resetNotification = {
                type: action.type,
                message: "",
                isSuccess: ""
            }
            return { ...state, resetNotification }
        default:
            return state

    }
};

export default notificationReducer;
