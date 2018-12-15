// Axios Request Posts

import axios from 'axios';
import { ADD_TO_FAV, DEL_FROM_FAV, GET_FROM_FAV } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Add a post to favourites
 *
 * @export
 * @param {string} action
 * @param {string} id
 * @param {string} postId
 * @returns bool
 */
export default function getAllPosts(action, username, id) {
    if (action === ADD_TO_FAV) {
        let message;
        let response;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/addToFav';
            axios.post(api_uri, {
                username,
                id,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    message = true;
                    response = res.data.content.result;
                } else {
                    message = false;
                }
                resolve([message, response]);
            })
            .catch(error => reject(error.message));
        });
    } else if (action === DEL_FROM_FAV) {
        let message;
        let response;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/delFav';
            axios.put(api_uri, {
                username,
                id,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    message = true;
                    response = res.data.content.result;
                } else {
                    message = false;
                }
                resolve([message, response]);
            })
            .catch(error => reject(error.message));
        });
    } else if (action === GET_FROM_FAV) {
        let message;
        let response;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/getFavs';
            axios.post(api_uri, {
                username,
                id,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    message = true;
                    response = res.data.content.result;
                } else {
                    message = false;
                }
                resolve([message, response]);
            })
            .catch(error => reject(error.message));
        });
    }
}