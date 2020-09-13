import { combineReducers } from 'redux';
import user from './user';
import booking from './booking';

export const reducers = combineReducers({
    user,
    booking,
});
