import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')

const Sinkron = () => import('../views/sinkron/Sinkron.vue')
const DataHapus = () => import('../views/sinkron/Hapus.vue')
 
const PesertaIndex = () => import('../views/peserta/Index.vue')
const PesertaData = () => import('../views/peserta/Peserta.vue')
const PesertaReset = () => import('../views/peserta/ResetPeserta.vue')

const UjianIndex = () => import('../views/ujian/Index.vue')
const UjianStatus = () => import('../views/ujian/UjianStatus.vue')
const UjianPeserta = () => import('../views/ujian/UjianPeserta.vue')

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '',
			name: 'home',
			component: Home,
			meta: { requiresAuth: true }
		},
		{
			path: '/download',
			name: 'download',
			component: Sinkron,
			meta: { requiresAuth: true, title: 'Sync' }
		},
		{
			path: '/peserta',
			component: PesertaIndex,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'peserta.data',
					component: PesertaData,
					meta: { title: 'Daftar peserta ujian'}
				},
				{
					path: 'reset',
					name: 'peserta.reset',
					component: PesertaReset,
					meta: { title: 'Reset peserta ujian' }
				}
			]
		},
		{
			path: '/ujian',
			component: UjianIndex,
			meta: { requiresAuth: true },
			children: [
				{
					path: 'status',
					name: 'ujian.status',
					component: UjianStatus,
					meta: { title: 'Status ujian'}
				},
				{
					path: 'peserta',
					name: 'ujian.peserta',
					component: UjianPeserta,
					meta: { title: 'Status peserta'}
				}
			]
		},
		{
			path: '/data/hapus',
			component: DataHapus,
			name: 'hapus',
			meta: { requiresAuth: true, title: 'Hapus data lokal' },
		}
	]
})

router.beforeEach((to, from , next) => {
	store.commit('CLEAR_ERRORS')
	if (to.matched.some(record => record.meta.requiresAuth)) {
		let auth = store.getters.isAuth
		if (!auth) {
			next({ name: 'login' })
		}
		else {
			next()
		}
	}
	else {
		next()
	}
})
export default router