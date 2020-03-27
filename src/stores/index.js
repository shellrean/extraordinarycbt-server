import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import pusat from './pusat.js'
import banksoal from './banksoal.js'
import ujian from './ujian.js'
import peserta from './peserta.js'
import user from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		pusat,
		ujian,
		peserta,
		user
	},
	state: {
		token: localStorage.getItem('token'),
		errors: [],
		isLoading: false,
		isLoadinger: false
	},
	getters: {
		isAuth: state => {
			return state.token != 'null' && state.token != null
		},
		isLoading: state => {
			return state.isLoading
		},
		isLoadinger: state => {
			return state.isLoadinger
		}
	},
	mutations: {
		SET_TOKEN(state, payload) {
			state.token = payload
		},
		SET_ERRORS(state, payload) {
			state.errors = payload
		},
		CLEAR_ERRORS(state) {
			state.errors = []
		},
		SET_LOADING(state, payload) {
			state.isLoading = payload
		},
		SET_LOADINGER(state, payload) {
			state.isLoadinger = payload
		}
	}
})

export default store