import * as actionTypes from '../actions/actionTypes';
import ValidationText from '../../models/ValidationText';

const initialState = {
    id: null,
    rooms: [],
    roomType: 1,
    dateFrom: null,
    dateTo: null,
    numberOfGuests: 1,
    guestName: new ValidationText(),
    guestPhoneNumber: new ValidationText(),
    allBookings: [],
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DATE_FROM:
            return { ...state, dateFrom: action.date };
        case actionTypes.UPDATE_DATE_TO:
            return { ...state, dateTo: action.date };
        case actionTypes.UPDATE_ROOM_TYPE:
            return { ...state, roomType: action.roomType };
        case actionTypes.UPDATE_GUESTS:
            return { ...state, numberOfGuests: action.guests };
        case actionTypes.UPDATE_ROOMS:
            return { ...state, rooms: action.rooms };
        case actionTypes.UPDATE_GUEST_NAME:
            return { ...state, guestName: action.name };
        case actionTypes.UPDATE_GUEST_NUMBER:
            return { ...state, guestPhoneNumber: action.phone };
        case actionTypes.UPDATE_ALL_BOOKINGS:
            return { ...state, allBookings: action.bookings };
        default:
            return state;
    }
};

export default reducer;