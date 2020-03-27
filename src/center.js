import axios from 'axios'
import store from './stores'
import router from './router'

const $axios = axios.create({
	baseURL: process.env.VUE_APP_CENTER+'/api/v1/',
	headers: {
		'Content-Type' : 'application/json'
	}
})

$axios.interceptors.request.use (
	function ( config ) {
		return config;
	},
	function ( error ) {
		return Promise.reject( error )
	}
)

$axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status == 401) {
   router.push({ name: 'login' })
  }
  return Promise.reject(error);
})

export default $axios