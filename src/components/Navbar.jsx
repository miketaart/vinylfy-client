import React, { Component } from 'react';
import './../pages/Home.css';
import logo from './../images/logo.png';
import { NavLink, withRouter } from "react-router-dom"
import {Fragment} from "react";
import {logout} from "../utils/auth";
import {getUser} from "../utils/auth";

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
    }


    handleLogout() {
        logout()
        .then((response) => {
            this.props.history.push("/auth/login");
        })
        .catch((error) => {
            console.log("logout error", error)
        })
        
    }
    
    render() {
        let user = getUser();
        return (
            <Fragment>
            {user ? 
            <div>
                <nav>
                    <div className="logo">
                        <NavLink to="/collection"><img src={logo} alt="pic" /></NavLink>
                    </div>
                    <ul className="nav-links">
                        <li>Hi, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</li>
                        <li><a href="#" onClick={this.handleLogout}>Log out</a></li>
                    </ul>
                </nav>
            </div>
            :
            <div>
            <nav className="header">
                <div className="logo">
                    <NavLink to="/"><img src={logo} alt="pic" /></NavLink>
                </div>
                <ul className="nav-links">
                    <li><NavLink to="/auth/login" activeClassName="selected">Log in</NavLink></li>
                    <li><NavLink to="/auth/signup" activeClassName="selected">Sign up</NavLink></li>
                </ul>
            </nav>
        </div>
            }
            </Fragment>
        );
    }
}


export default withRouter(Navbar); 