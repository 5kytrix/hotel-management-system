import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// import { NavLink as RouterNavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Container } from 'reactstrap';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import ValidationText from '../models/ValidationText';
import * as userActions from '../store/actions/user';
import * as paths from '../utils/constants/paths';

function HeaderNavbar(props) {
    const name = useSelector(state => state.user.name);
    const [isOpen, setOpen] = useState(false);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const toggle = useCallback(() => {
        setOpen(!isOpen);
    }, [isOpen]);

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove('hms-token');
        dispatch(userActions.updateUserName(new ValidationText()));
        dispatch(userActions.updateUserEmail(new ValidationText()));
        dispatch(userActions.updateUserId(''));
        dispatch(userActions.updateIsAdmin(false));
        dispatch(userActions.updateUserLoggedIn(false));
        props.history.push('/login');
    };

    const viewAccount = () => {
        props.history.push('/profile');
    };

    const viewBookings = () => {
        props.history.push('/bookings');
    };

    const viewHotelDetails = () => {
        props.history.push('/admin/details')
    }

    const getUserItems = () => {
        if (user.isAdmin) {
            return([
                { name: 'Hotel Details', click: viewHotelDetails },
                { name: 'Account', click: viewAccount },
                { name: 'Bookings', click: viewBookings },
                { name: 'Logout', click: logout },
            ]);
        } else {
            return([
                { name: 'Account', click: viewAccount },
                { name: 'Bookings', click: viewBookings },
                { name: 'Logout', click: logout },
            ]);
        }
    };
    return (
        <Navbar expand="lg" light className="bg-dark ftco-navbar-light scrolled awake">
            <Container>
                <NavbarBrand href={paths.HOME} className="navbar-brand">
                    Harbor<span>lights</span>
                </NavbarBrand>

                <NavbarToggler onClick={toggle} data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation"><span className="oi oi-menu"></span> Menu</NavbarToggler>

                <Collapse isOpen={isOpen} navbar id="ftco-nav">
                    <Nav navbar className="ml-auto">
                        <NavItem active>
                            <NavLink href={paths.HOME}>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={paths.ABOUT}>
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={paths.CONTACT}>
                                Contact
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar className="ml-auto">
                        {user.isLoggedIn ? <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {name.text}
                            </DropdownToggle>
                            <DropdownMenu right>
                                {getUserItems().map(item => (
                                    <DropdownItem key={item.name} onClick={item.click} >{item.name}</DropdownItem>))}
                            </DropdownMenu>
                        </UncontrolledDropdown> :
                        <NavItem>
                        <NavLink href={paths.LOGIN}>
                            Login / Signup
                        </NavLink>
                        </NavItem>
                        }
                    </Nav>
                </Collapse>
	    </Container>
        </Navbar>
    );
}

export default withRouter(HeaderNavbar);