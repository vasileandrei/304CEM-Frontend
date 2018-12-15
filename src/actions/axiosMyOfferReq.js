// Axios Request My Offer

import axios from 'axios';
import { GET_MY_OFFERS } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

/**
 * Send an offer request to get all the offers
 * on which the usser hasplaced an offer
 *
 * @export
 * @param {string} action
 * @param {string} offerUser
 * @returns bool
 */

export default function OffersRequests(action, offerUser) {
    if (action === GET_MY_OFFERS) {
        let message;
        let offersList;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/getAllMyOffers';
            axios.post(api_uri, {
                username: offerUser,
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    message = true;
                    offersList = res.data.content.result;
                }
                resolve([message, offersList]);
            })
            .catch(error => reject(error.message));
        });
    }
}