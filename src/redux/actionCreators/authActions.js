/** @format */

import { response } from 'msw';
import {
	CLEAR_ORDERS,
	CLEAR_USERS,
	INIT_AUTH,
	NEW_NOTIFICATION,
	REMOVE_AUTH,
} from '../constants';
import { createNotification } from './notificationsActions';

// Use this regex for email validation
const validEmailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Invalid Auth Messages:
export const invalidAuth = {
	name: 'Name too short',
	email: 'Invalid email',
	password: 'Password too short',
	passwordMismatch: 'Password missmatch',
};

// Valid auth messages.
export const validAuth = {
	welcome: function (name) {
		return `Welcome to my store, ${name}!`;
	},
	welcomeBack: 'Welcome back!',
};

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not there is the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful, Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} Thunk
 */
export const initAuth = () => {
	return function (dispatch) {
		fetch('/api/check-status').then(response => {
			if (response.ok) {
				response.json().then(parsedData => {
					dispatch({
						type: INIT_AUTH,
						payload: parsedData.user
					})
				})

			}
		}).catch(err => {
			dispatch(createNotification({ type: NEW_NOTIFICATION, message: err, isSuccess: false }));
		})
	}
};
/**
 * @description Asynchronous thunk that handles validation for logInCreds (check Login and Registration validation from assignment instructions). Expects for a successful login-response from server, before dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with validAuth.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification.
 * @param {Object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} action
 */
export const logIn = (logInCreds) => {
	return function (dispatch) {
		dispatch({
			type: INIT_AUTH,
			payload: { role: 'guest' }
		});
		if (!validEmailRegex.test(logInCreds.email)) {
			return dispatch({
				type: NEW_NOTIFICATION,
				message: "Email must be in valid form",
				isSuccess: false
			});
		}
		if (logInCreds.password.length < 10) {
			return dispatch({
				type: NEW_NOTIFICATION,
				message: "Password is shorter than 10 characters",
				isSuccess: false
			});
		}
		fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(logInCreds),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.ok) {
				response.json().then(parsedData => {
					dispatch({
						type: INIT_AUTH,
						payload: parsedData
					});
				})
			} else {
				response.json().then(parsedErrorData => {
					return dispatch({
						type: NEW_NOTIFICATION,
						message: parsedErrorData.error,
						isSuccess: false
					});
				})
			}

		}).catch((err) => {
			return dispatch({
				type: NEW_NOTIFICATION,
				message: err,
				isSuccess: false
			});
		})
	}
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server, before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function}
 */
export const logOut = () => { };

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for registerCreds (check Login and Registration validation from assignment instructions). If the response is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification. If the error itself is an object, then it should pass whatever is inside the object.
 * @param registerCreds - The data of the user
 * @returns {Function}
 */
export const register = (registerCreds) => {
	return function (dispatch) {
		/**--Form Validation starts */
		if (registerCreds.name.length < 4) {
			return dispatch(createNotification({
				type: NEW_NOTIFICATION,
				message: "Name should have atleast 4 characters",
				isSuccess: false
			}));
		}
		if (!validEmailRegex.test(registerCreds.email)) {
			return dispatch(createNotification({
				type: NEW_NOTIFICATION,
				message: "Email must be in valid form",
				isSuccess: false
			}));
		}
		if (registerCreds.password.length < 4) {
			return dispatch(createNotification({
				type: NEW_NOTIFICATION,
				message: "Password cannot be shorter than 10 characters",
				isSuccess: false
			}));
		}
		if (registerCreds.confirm_password !== registerCreds.password) {
			return dispatch(createNotification({
				type: NEW_NOTIFICATION,
				message: "Password and confirm password does not match",
				isSuccess: false
			}));
		}
		/**--Validation ends */
		//send registration request to server
		fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({ name: registerCreds.name, email: registerCreds.email, password: registerCreds.password }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			if (response.ok)
				dispatch(INIT_AUTH(registerCreds));
		}).catch((err) => {
			return dispatch(createNotification({
				type: NEW_NOTIFICATION,
				message: err,
				isSuccess: false
			}));
		})
	}

};
