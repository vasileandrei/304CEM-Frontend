// Axios Request Posts

import axios from 'axios';
import { GET_ALL_POSTS } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Get all the posts for one unique user
 *
 * @export
 * @param {string} action
 * @param {string} id
 * @returns bool
 */
export default function getAllPosts(action, username) {
    if (action === GET_ALL_POSTS) {
        let message;
        let response;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/getAllPosts';
            axios.post(api_uri, {
                colName: 'posts',
                username,
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