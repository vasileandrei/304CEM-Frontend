import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginAndRegister from './apps/LoginAndRegister/LoginAndRegister';
import MainPage from './apps/MainPage/MainPage';

import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import FileShare from './components/FileShare/FileShare';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import ItemsList from './components/Files/Files';
import ItemDisplay from './components/ItemDetails/ItemDetails';
import SendOfferModal from './components/SendOfferModal/SendOfferModal';
import UserItems from './components/UserItems/UserItems';
import CheckOneOffer from './components/CheckOneOffer/CheckOneOffer';

class App extends Component {

    /**
     * Universal toast message displayer
     *
     * @param {String} message
     * @memberof App
     */
    notify(message) {
        toast(message, { className: 'toast' });
    }

    render() {
        return (
            // Initialize Routing Model
            <BrowserRouter>
            <div>
                <Header toast={this.notify} />
                <Route exact path="/" component={Home} />
                <Route path="/loginAndRegister" component={LoginAndRegister} />
                <Route path="/allPosts" component={ItemsList} />
                <Route path="/allPosts/:id" component={ItemDisplay} />
                <Route path="/allPosts/:id/makeOffer" component={SendOfferModal} />
                <Route path="/postItem" component={MainPage} />
                <Route path="/myItems" component={UserItems} />
                <Route path="/myItems/:id" component={CheckOneOffer} />
                <Route path="/getFile/:id" component={FileShare} />
                <Route path="/contact" component={Contact} />
                <Route path="/myProfile" component={Profile} />
                {/* <Footer /> */}
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
