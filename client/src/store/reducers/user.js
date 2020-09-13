import * as actionTypes from '../actions/actionTypes';
import ValidationText from '../../models/ValidationText';

const initialState = {
    id: null,
    name: new ValidationText(''),
    email: new ValidationText(''),
    password: new ValidationText(''),
    isAdmin: false,
    isLoggedIn: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_ID:
            return { ...state, id: action.id };
        case actionTypes.UPDATE_USER_NAME:
            return { ...state, name: action.name };
        case actionTypes.UPDATE_USER_EMAIL:
            return { ...state, email: action.email };
        case actionTypes.UPDATE_USER_PASSWORD:
            return { ...state, password: action.password };
        case actionTypes.UPDATE_USER_IS_ADMIN:
            return { ...state, isAdmin: action.isAdmin};
        case actionTypes.UPDATE_USER_LOGGED_IN:
            return { ...state, isLoggedIn: action.loggedIn };
        default:
            return state;
    }
};

export default reducer;