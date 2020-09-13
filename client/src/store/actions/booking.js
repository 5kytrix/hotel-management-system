import * as actionTypes from './actionTypes';

export const updateDateFrom = date => ({ type: actionTypes.UPDATE_DATE_FROM, date});
export const updateDateTo = date => ({ type: actionTypes.UPDATE_DATE_TO, date});
export const updateRoomType = roomType => ({ type: actionTypes.UPDATE_ROOM_TYPE, roomType });
export const updateGuests = guests => ({ type: actionTypes.UPDATE_GUESTS, guests });
export const updateRooms = rooms => ({ type: actionTypes.UPDATE_ROOMS, rooms });
export const updateGuestName = name => ({ type: actionTypes.UPDATE_GUEST_NAME, name });
export const updateGuestNumber = phone => ({ type: actionTypes.UPDATE_GUEST_NUMBER, phone });
export const updateAllBookings = bookings => ({ type: actionTypes.UPDATE_ALL_BOOKINGS, bookings });
