// Axios Request Authentification - Login or Register Requests


import axios from 'axios';
import setAuthorizationHeader from './../utils/setAuthorizationToken';
import { LOGIN_REQ, REGISTER_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * IF LOGIN_REQ    - Login Request
 * IF REGISTER_REQ - Register Reaquest
 *
 * @export
 * @param {String} action
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @returns []
 */
export default function(action, username, password, email) {
    // Login Request
    if (action === LOGIN_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            const api_uri = 'http://localhost:8080/api/v1/login';
            axios.post(api_uri, {
                username,
                password,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    redirect = true; // Boll if redirect to next page of response
                    message = res.data.content.message; // Mesage to be displayed
                    const token = res.data.content.result.token; // Generated token
                    localStorage.setItem('jwtToken', token); // Set token to localStore
                    setAuthorizationHeader(token); // Append token to Redux Store
                } else {
                    message = 'Username and password don\'t match';
                }
                resolve([message, redirect]);
            })
            .catch(error => reject(error.message));
        });
    // Register Request
    } else if (action === REGISTER_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            const api_uri = 'http://localhost:8080/api/v1/register';
            axios.post(api_uri, {
                username,
                password,
                email,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    redirect = true; // Boll if redirect to next page of response
                    message = res.data.message; // Mesage to be displayed
                } else if (res.data.hasBeenSuccessful === false) {
                    message = res.data.message; // Mesage to be displayed
                } else {
                    message = res.data.errors.error.message; // Error to be displayed
                }
                resolve([message, redirect]);
            })
            .catch(error => reject(error.message));
        });
    }
}
