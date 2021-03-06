import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'

import setAuthToken from './utils/auth-token'

import { setCurrentUser, logout } from './redux/actions/auth.actions'
import { getCookie } from './utils/cookie-helper'

import { COOKIE_JWT } from './constants/environment'

import Navbar from './components/layouts/Navbar'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProfilePage from './components/profile/ProfilePage'
import NotFound from './components/errors/404-not-found'
import { Context } from './Context'
import './App.css';
import PostPage from './components/posts/PostPage';
import ProfilesResults from './components/profile/ProfilesResults';

// check for token
const token = getCookie(COOKIE_JWT)

if (token) {
    // Set auth token header auth
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logout());
        // Clear current Profile
        //store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/';
    }
}

class App extends Component {

    componentDidCatch(err){
        alert(err);
    }

    render() {
        return (
            <Context.Provider value={{ _loading: false }}>
                <Provider store={store}>
                    <BrowserRouter>
                        {/* Navigation */}
                        <Navbar />

                        {/* Routes */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/profile/:id" component={ProfilePage} />
                            <Route path="/post/:id" component={PostPage} />
                            <Route path="/search/profiles" component={ProfilesResults} />

                            {/* Default */}
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                    { this.context._loading ? (<div className="loading"><center><img src="https://cdn.dribbble.com/users/600626/screenshots/2944614/loading_12.gif"></img></center></div>) : null }
                </Provider>
            </Context.Provider>
        )
    }
}

export default App