import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from 'react-router-dom';
import './Header.scss';


const Header = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <NavLink exact to="/" activeClassName="selected-link" className="header-navbar">
                        User Form
                    </NavLink>
                    <NavLink to="/user-detail" activeClassName="selected-link" className="header-navbar">
                        User Search
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;