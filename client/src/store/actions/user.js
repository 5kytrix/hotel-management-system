import * as actionTypes from './actionTypes';

export const updateUserId = id => ({ type: actionTypes.UPDATE_USER_ID, id});
export const updateUserName = name => ({ type: actionTypes.UPDATE_USER_NAME, name});
export const updateUserEmail = email => ({ type: actionTypes.UPDATE_USER_EMAIL, email});
export const updateUserPassword = password => ({ type: actionTypes.UPDATE_USER_PASSWORD, password});
export const updateIsAdmin = isAdmin => ({ type: actionTypes.UPDATE_USER_IS_ADMIN, isAdmin});
export const updateUserLoggedIn = loggedIn => ({ type: actionTypes.UPDATE_USER_LOGGED_IN, loggedIn});