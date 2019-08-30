import axios from 'axios';
import history from '../history';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const REMOVE_USER = 'REMOVE_USER';
const GET_USER = 'GET_USER';

const removeUser = () => ({ type: REMOVE_USER });

const authenticating = () => ({
	type: AUTH_REQUEST,
	isLoggedIn: false
});

const authenticate = userData => ({
	type: AUTH_SUCCESS,
	user: userData,
	isLoggedIn: true
});

const authError = error => ({
	type: AUTH_FAILURE,
	error: 'Failed to authenticate',
	payload: error
});

const getUser = user => ({ type: GET_USER, user });

// export const auth = () => {
// 	return async dispatch => {
// 		dispatch(authenticating());
// 		try {
// 			const { data } = await axios.get('/auth/me');
// 			if (data.email) {
// 				dispatch(authenticate(data));
// 			}
// 		} catch (error) {
// 			dispatch(authError(error));
// 		}
// 	};
// };
export const me = () => async dispatch => {
	try {
		const res = await axios.get('/auth/me');
		dispatch(getUser(res.data || defaultUser));
	} catch (err) {
		console.error(err);
	}
};

export const auth = (email, password, method) => async dispatch => {
	let res;
	try {
		res = await axios.post(`/auth/${method}`, { email, password });
	} catch (authError) {
		return dispatch(getUser({ error: authError }));
	}

	try {
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr);
	}
};

export const logout = () => async dispatch => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		history.push('/login');
	} catch (err) {
		console.error(err);
	}
};

const initialState = {
	user: {
		email: ''
	},
	isLoggedIn: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case AUTH_REQUEST:
			return { ...state, login: action.login, isFetching: true };
		case AUTH_SUCCESS:
			return { user: action.user, login: action.login, isFetching: false };
		case REMOVE_USER:
			return initialState;
		default:
			return state;
	}
}
