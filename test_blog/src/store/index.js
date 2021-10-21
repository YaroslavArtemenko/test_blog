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

export const ARTICLES = 'articles'
const articles = [
        {
            id: '1',
            category: 'Sport',
            name: 'Football',
            previewText: 'Ole Gunnar Solskjaer\'s praise for Cristiano Ronaldo: \'That\'s what he does best\'',
            author: 'Yaroslav Artemenko',
            date: '21.10.2021',
            mainText: 'Solskjaer on Ronaldo: "I was really, really pleased with how he led the line. As a centre forward we asked him to run the channels, drop in, press more because we\'re at home, of course. We want to get the crowd behind us. He did everything a centre forward should be doing"'
        },
        {
            id: '2',
            category: 'Meal',
            name: 'Ice cream sandwich',
            previewText: '          calories: 237,\n' +
                '          fat: 9.0,\n' +
                '          carbs: 37,\n' +
                '          protein: 4.3,\n' +
                '          sodium: 129',
            author: 'Nile Jensen',
            date: '21.10.2021',
            mainText: 'Ice cream sandwiches are as much a part of summer as rain is to spring and bicycles to childhood.\n' +
                '\n' +
                'These classic hot-weather treats remind me of drinking from the hose, piles of bikes discarded in front yards, sitting on the front porch, and licking the sticky, sweet chocolate cake from my fingertips, while creamy vanilla ice cream melts down my wrist.'
        },
        {
            id: '3',
            category: 'Sport',
            name: 'Soccer',
            previewText: 'BIG DEAL Get £20 risk-free bet on Vitesse vs Tottenham Europa Conference League clash, plus 89/1 Paddy Power prediction special',
            author: 'Hadassah Philip',
            date: '21.10.2021',
            mainText: 'TOTTENHAM take on Vitesse Arnhem in their Europa Conference League group clash on Thursday.\n' +
                '\n' +
                'And Paddy Power are offering brand new customers a completely risk free £20 bet on the action PLUS a massive 89/1 bet builder special.'
        },
        {
            id: '4',
            category: 'Meal',
            name: 'Cupcake',
            previewText: ' Calories: 305,\n' +
                '          Fat: 3.7,\n' +
                '          Carbs: 67,\n' +
                '          Protein: 4.3,\n' +
                '          Sodium: 413',
            author: 'Christie Brett',
            date: '21.10.2021',
            mainText: 'Bake these easy vanilla cupcakes in just 35 minutes. Perfect for birthdays, picnics or whenever you fancy a sweet treat, they\'re sure to be a crowd-pleaser'

        },
        {
            id: '5',
            category: 'Meal',
            name: 'Gingerbread',
            previewText: ' calories: 356,\n' +
                '          fat: 16.0,\n' +
                '          carbs: 49,\n' +
                '          protein: 3.9,\n' +
                '          sodium: 327',
            author: 'Nathanial Guy',
            date: '21.10.2021',
            mainText: 'Here is my favorite gingerbread cookies recipe and one of the most popular Christmas cookie recipes on this website. Soft in the centers, crisp on the edges, perfectly spiced, molasses and brown sugar-sweetened holiday goodness. '
        },
    ]

export default new Vuex.Store({
    state: {
        articles,
        article: null
    },


    getters: {
        [ARTICLES](state) {
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