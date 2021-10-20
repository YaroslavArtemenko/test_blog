// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export const GET_ARTICLES = 'GET_ARTICLES'
export const GET_ARTICLE = 'GET_ARTICLE'
export const SET_ARTICLE = 'SET_ARTICLE'
export const SET_ARTICLES = 'SET_ARTICLES'

export const CREATE_ARTICLE = 'CREATE_ARTICLE'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'


export default new Vuex.Store({
    state: {
        articles: [],
        article: null
    },


    getters: {
        [GET_ARTICLES](state) {
            return state.articles
        },
        [GET_ARTICLE](state) {
            return state.article
        },

    },



    mutations: {
        [SET_ARTICLES](state, payload) {
            state.articles = payload
        },
        [SET_ARTICLE](state, payload) {
            state.article = payload
        },

        [CREATE_ARTICLE](state, payload) {
            state.articles.push(payload)
        },
        [UPDATE_ARTICLE](state, payload) {
            const foundIndex = state.articles.findIndex(article => article.id === payload.id)
            state.articles[foundIndex] = payload
        },
        [DELETE_ARTICLE](state, payload) {
            const foundIndex = state.articles.findIndex(article => article.id === payload.id)
            state.articles.splice(foundIndex, 1)
        }

    },



    actions: {
        setArticles({commit}, articles) {
            commit(SET_ARTICLES, articles)
        },
        setArticle({commit}, article) {
            commit(SET_ARTICLE, article)
        },

        createArticle({commit}, article) {
            commit(CREATE_ARTICLE, article)
        },
        updateArticle({commit}, article) {
            commit(UPDATE_ARTICLE, article)
        },
        deleteArticle({commit}, article) {
            commit(DELETE_ARTICLE, article)
        }
    }
});