<template>
  <div class="container-fluid">
    <div class="row" style="height: 100vh">
      <div class="col-md-6">
        <img src="/img/bg.svg" style="width: 100%;">
      </div>
      <div class="col-md-6 bg-white" style="height: 100vh;">
        <div class="mt-auto" style="position: absolute;top: 30%; transform: translateY(-30%)">
          <div >
            <h4>Extraordinary-CBT Login</h4>
          </div>
          <div v-if="install.status == 'installed'">
            <div class="alert alert-danger rounded-0" v-if="errors.invalid">{{ errors.invalid }}</div>
            <p class="text-muted">Selamat datang di aplikasi Extraordinary-CBT. Silahkan masukkan username dan password</p>
            <form @submit.prevent="postLogin">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0">
                  <i class="cil-equalizer"></i>
                </span>
              </div>
              <input class="form-control" readonly v-model="serial.data">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0">
                  <i class="cil-laptop"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.username }" type="text" placeholder="ID Server" v-model="data.username" @keyup="clearError" readonly="">
              <div class="invalid-feedback" v-if="errors.username">{{ errors.username[0] }}</div>
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend rounded-0">
                <span class="input-group-text rounded-0">
                  <i class="cil-lock-locked"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.password }" type="password" placeholder="Password" v-model="data.password" @keyup="clearError">
              <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
            </div>
            <b-button variant="dark" type="submit" squared :disabled="isLoading">
              <b-spinner small type="grow" v-show="isLoading"></b-spinner>
              Login
            </b-button>
            </form>
          </div>
          <div v-else>
            <div class="alert alert-danger rounded-0" v-if="errors.invalid">{{ errors.invalid }}</div>
            <p class="text-muted">Selamat datang di aplikasi Extraordinary-CBT. masukkan ID Server dan password</p>
            <form @submit.prevent="postSubmit">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0">
                  <i class="cil-equalizer"></i>
                </span>
              </div>
              <input class="form-control" readonly v-model="serial.data">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0">
                  <i class="cil-laptop"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.id_server }" type="text" placeholder="ID Server" v-model="server.id_server" @keyup="clearError">
              <div class="invalid-feedback" v-if="errors.id_server">{{ errors.id_server[0] }}</div>
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend rounded-0">
                <span class="input-group-text rounded-0">
                  <i class="cil-lock-locked"></i>
                </span>
              </div>
              <input class="form-control" :class="{ 'is-invalid' : errors.password }" type="password" placeholder="Password" v-model="server.password" @keyup="clearError">
              <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
            </div>
            <b-button variant="dark" squared type="submit" :disabled="isLoading" >
              <b-spinner small type="grow" v-show="isLoading"></b-spinner>
              Submit
            </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      data: {
        username: '',
        password: ''
      },
      server: {
        id_server: '',
        password: '',
      }
    }
  },
  created() {
    if (this.isAuth) {
      this.$router.push({ name: 'home' })
    }
    this.getSerial()
  },
  computed: {
    ...mapState('pusat', {
       serial : state => state.serial,
       install: state => state.install
    }),
    ...mapGetters(['isAuth','isLoading']),
    ...mapState(['errors'])
  },
  methods: {
    ...mapActions('pusat',['getSerial','getStatusInstal','registerServer']),
    ...mapActions('auth', ['submit']),
    ...mapActions('pusat',['getServerIdentify']),
    ...mapMutations(['CLEAR_ERRORS','SET_LOADING']),
    postLogin() {
      this.SET_LOADING(true)
      this.submit(this.data)
      .then( () => {
        if (this.isAuth) {
          this.CLEAR_ERRORS()
          this.$router.push({ name: 'home' })
        }
      })
    },
    postSubmit() {
      this.SET_LOADING(true)
      this.registerServer({ server: this.server, serial: this.serial })
      .then((res) => {
        this.$notify({
		        group: 'foo',
		        title: res.type,
		        type: res.type,
		        text: res.status
		    })
        this.getStatusInstal(this.serial)
      })
    },
    clearError() {
      this.CLEAR_ERRORS()
    }
  },
  destroyed() {
    this.getServerIdentify()
  },
  watch: {
    serial() {
      this.getStatusInstal(this.serial)
    },
    install() {
      this.data.username = this.install.username
    }
  }
}
</script>