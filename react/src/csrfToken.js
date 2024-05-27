// csrfToken.js
import axios from 'axios';
import cookie from "react-cookies";

export function setCSRFToken() {
    console.log('before : ', axios.defaults.headers.common['X-CSRFToken'])
    axios.defaults.headers.common['X-CSRFToken'] = cookie.load('csrftoken');
    console.log('after : ', axios.defaults.headers.common['X-CSRFToken'])
}