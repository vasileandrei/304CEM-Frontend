/* eslint-disable no-magic-numbers */
// Axios Request File - File Download - Upload

import axios from 'axios';
import { UPLOAD_REQ, DOWNLOAD_REQ, FILE_UPLOAD_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
    }
};

/**
 * Create file FormData
 *
 * @param {*} currentName
 * @returns
 */
function getFiles(files) {
    // Create FormData to store image data
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
        // Use <image> for unique identifier name
        data.append('image', files[i]);
    }
    return data;
}

/**
 * Generate downloaded image name on client side
 *
 * @param {*} currentName
 * @returns
 */
function getFileName(currentName) {
    const nameList = currentName.split('.');
    const listLength = nameList.length;
    const fileName = `FileShare-${nameList[listLength - 3]}.${nameList[listLength - 1]}`;
    return fileName;
}


/**
 * IF FILE_UPLOAD_REQ  - Upload file request
 * IF UPLOAD_REQ       - Uplaod request
 * IF DOWNLOAD_REQ     - Download reaquest
 *
 * @export
 * @param {string} action
 * @param {string} file
 * @param {string} title
 * @param {string} description
 * @param {string} location
 * @param {number} price
 * @param {string} category
 * @returns []
 */
export default function(action, files, condition, title, description, location, price, category) {
    // Upload new file
    if (action === FILE_UPLOAD_REQ) {
        return new Promise((resolve, reject) => {
            let filesList;
            const data = getFiles(files);
            const api_uri = 'http://localhost:8085/api/v1/files/upload';
            axios({
                method: 'post',
                url: api_uri,
                data: data,
                config: { headers }
            })
                .then(res => {
                    if (res.data.hasBeenSuccessful === true) {
                        filesList = res.data.content.files;
                    }
                    resolve(filesList);
                })
                .catch(error => reject(error.message));
        });
        // Upload form
    } else if (action === UPLOAD_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            const api_uri = 'http://localhost:8080/api/v1/addDoc';
            axios.post(api_uri, {
                files,
                condition,
                title,
                description,
                location,
                price,
                category
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true) {
                    message = 'Post succesffully submited';
                    redirect = true;
                } else {
                    message = 'Internal server problems';
                    redirect = false;
                }
                resolve([message, redirect]);
            })
            .catch(error => reject([error.message, false]));
        });
        // Download existing file
    } else if (action === DOWNLOAD_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            const newFileName = getFileName(files);
            axios.get(files, {
                responseType: 'blob' // important
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', newFileName); // Set attribute and file name
                    document.body.appendChild(link);
                    link.click();
                    message = 'Sucessfully downloaded';
                    resolve(message); // Send message as a response
                })
                .catch(error => reject(error.message));
        });
    }
}