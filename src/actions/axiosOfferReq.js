// Axios Request Offer

import axios from 'axios';
import { ADD_OFFER } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Send an offer request for the item
 *
 * @export
 * @param {string} action
 * @param {string} postId
 * @param {string} offerUser
 * @param {string} offerMessage
 * @param {string} offerPrice
 * @returns bool
 */
export default function deleteFile(action, postId, offerUser, offerMessage, offerPrice) {
    if (action === ADD_OFFER) {
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/addOffer';
            axios.post(api_uri, {
                postId,
                username: offerUser,
                message: offerMessage,
                price: offerPrice,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    resolve(true);
                }
                resolve(false);
            })
            .catch(error => reject(error.message));
        });
    }
}