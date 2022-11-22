import axios from 'axios';
import {
    LOGIN,
    REGISTER,
    BASE_URL_API,
    CREATEBLOCK,
    GETBLOCKSITE,
    EDITBLOCK,
    APROVEBLOCK,
    ADDCOMMENT,
    GETALLBLOCKSITE
} from './ApiConstants';

const instance = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
});

const getUrlEncodedBody = (body) => {
    let formBody = [];
    for (let property in body) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
};

const postCall = (url, body, config) => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, body, config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response)
                    resolve(error.response.data)
            });
    });
};

const getCall = (url, config) => {
    return new Promise((resolve, reject) => {
        instance
            .get(url, config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response)
                    resolve(error.response.data)
            });
    });
};


export const userLogin = (data) => {
    return postCall(LOGIN, getUrlEncodedBody(data));
}

export const userRegister = (data) => {
    return postCall(REGISTER, getUrlEncodedBody(data));
}

export const createBlock = (data) => {
    return postCall(CREATEBLOCK, getUrlEncodedBody(data));
}

export const getBlocksSite = () => {
    return getCall(GETBLOCKSITE, getUrlEncodedBody());
}

export const getAllBlocksSite = () => {
    return getCall(GETALLBLOCKSITE, getUrlEncodedBody());
}

export const updateBlockStatus = (data) => {
    return postCall(APROVEBLOCK, getUrlEncodedBody(data));
}

export const editTheBlock = (data) => {
    return postCall(EDITBLOCK, getUrlEncodedBody(data));
}