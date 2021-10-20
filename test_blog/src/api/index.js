import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "../store"
import {SET_ARTICLES} from "../store";


export const getArticles = () => {
    return axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (store.dispatch(SET_ARTICLES, response)));
}