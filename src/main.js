// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

import CoreuiVue from '@coreui/coreui'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false
Vue.use(CoreuiVue)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

import 'sweetalert2/dist/sweetalert2.min.css';

import { mapActions, mapGetters } from 'vuex'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  computed: {
   	...mapGetters(['isAuth'])
   },
   methods: {
   	...mapActions('pusat', ['getServerIdentify'])
   },
   created() {
   	if (this.isAuth) {
   		this.getServerIdentify()
   	}
   }
})
