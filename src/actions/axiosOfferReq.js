// Axios Request Offer

import axios from 'axios';
import { ADD_OFFER, GET_ALL_OFFERS, ACCEPT_OFFER } from './types';

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
export default function OffersRequests(action, postId, offerUser, offerMessage, offerPrice) {
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
    } else if (action === GET_ALL_OFFERS) {
        let message;
        let response;
        return new Promise((resolve, reject) => {
            const api_uri = 'http://localhost:8080/api/v1/getAllOffers';
            axios.post(api_uri, {
                username: offerUser,
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
        } else if (action === ACCEPT_OFFER) {
            let message;
            let response;
            return new Promise((resolve, reject) => {
                const api_uri = 'http://localhost:8080/api/v1/acceptOffer';
                axios.post(api_uri, {
                    postId,
                    offerId: offerUser,
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