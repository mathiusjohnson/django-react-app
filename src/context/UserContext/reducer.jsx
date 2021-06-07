let email = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).email
	: '';
// let token = localStorage.getItem('currentUser')
// 	? JSON.parse(localStorage.getItem('currentUser')).auth_token
// 	: '';

export const initialState = {
	email: '' || email,
	// token: '' || token,
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
            console.log(action);
			return {
				...initialState,
				loading: true,
			};
			case 'LOGIN_SUCCESS':

			return {
				...initialState,
				email: action.payload.email,
                isAdmin: action.payload.isAdmin,
				id: action.payload.id,
				token: action.payload.password,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
                email: ''
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};