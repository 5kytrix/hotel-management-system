import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import * as jwt from 'jwt-decode';
import axios from 'axios';

import HeaderNavbar from './containers/HeaderNavbar';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import Signup from './containers/Signup';
import BookingDetails from './containers/BookingDetails';
import AllBookings from './containers/AllBookings';
import UserDetails from './containers/UserDetails';
import AdminSignup from './containers/AdminSignup';
import HotelDetails from './containers/HotelDetails';

import ValidationText from './models/ValidationText';
import * as paths from './utils/constants/paths';
import * as actions from './store/actions/user';
import * as bookingActions from './store/actions/booking';
import { wrappedUrl } from './utils/urlUtils'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  const cookie = new Cookies();
  const token = cookie.get('hms-token');
  if (token) {
    const tokenInfo = jwt(token);
    const isLoggedIn = tokenInfo.exp > Date.now() / 1000;
    if (isLoggedIn) {
      const { id } = tokenInfo;
      axios.get(wrappedUrl(`/api/users/${id}`)).then(resp => {
        const user = resp.data;
        dispatch(actions.updateUserName(new ValidationText(user.name)));
        dispatch(actions.updateUserEmail(new ValidationText(user.email)));
        dispatch(actions.updateUserId(id));
        dispatch(actions.updateIsAdmin(user.isAdmin));
        dispatch(actions.updateUserLoggedIn(true));
        let newId;
        if (user.isAdmin) {
          newId = 123;
        } else {
          newId = id;
        };
        axios.get(wrappedUrl(`/api/bookings/${newId}`))
            .then((resp) => {
                dispatch(bookingActions.updateAllBookings([ ...resp.data ]));
            })
      })
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <HeaderNavbar />
      <Switch>
          <Route path={paths.HOME} component={HomePage} exact />
          <Route path={paths.LOGIN} component={Login} exact />
          <Route path={paths.SIGNUP} component={Signup} exact />
          <Route path={paths.BOOKING} component={BookingDetails} exact />
          <Route path={paths.BOOKINGS} component={AllBookings} exact />
          <Route path={paths.PROFILE} component={UserDetails} exact />
          <Route path={paths.ADMIN_SIGNUP} component={AdminSignup} exact />
          <Route path={paths.HOTEL_DETAILS} component={HotelDetails} exact />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
