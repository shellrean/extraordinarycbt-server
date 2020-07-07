<template>
	<div class="c-body">
	<loading :active.sync="isSync" 
        :is-full-page="true"></loading>
        <main class="c-main">
          <div class="container-fluid">
            <div class="fade-in">
            	<div class="card">
            		<div class="card-header" v-if="identify">
            			<b-button class="mr-1" size="sm" squared variant="light" @click="syncData" v-if="!identify.peserta || identify.peserta == 0 || !identify.matpel || identify.matpel == 0 || !identify.banksoal || identify.banksoal == 0 || !identify.soal || identify.soal == 0 || !identify.pilihan_soal || identify.pilihan_soal == 0 || !identify.gambar || identify.gambar == 0 || !identify.jadwal || identify.jadwal == 0">Mulai sync</b-button>
            			<b-button size="sm" squared variant="primary" @click="$bvModal.show('modal-selesai')">Refresh status</b-button>
            		</div>
            		<div class="card-body" v-if="identify">
            			<div class="form-group">
            				<label>Data 1</label>
            				<b-progress :value="identify.peserta == 1 ? 100 : peserta.progress" variant="info" animated show-progress class="mt-2"></b-progress>
            				<small v-show="identify.peserta ? 0 : peserta.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.peserta ? 0 : peserta.step == 2">Step 2 of 2- Memasukkan adata ke database</small>
            				<small v-show="identify.peserta ? 1 : peserta.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 2</label>
            				<b-progress :value="identify.matpel == 1 ? 100 : matpel.progress" variant="info" animated show-progress class="mt-2"></b-progress>
            				<small v-show="identify.matpel ? 0 : matpel.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.matpel ? 0 : matpel.step == 2">Step 2 of 2- Memasukkan adata ke database</small>
            				<small v-show="identify.matpel ? 1 : matpel.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 3</label>
            				<b-progress :value="identify.banksoal == 1 ? 100 : banksoal.progress" variant="info" animated show-progress class="mt-2"></b-progress>
            				<small v-show="identify.banksoal ? 0 : banksoal.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.banksoal ? 0 : banksoal.step == 2">Step 2 of 2- Memasukkan adata ke database</small>
            				<small v-show="identify.banksoal ? 1 : banksoal.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 4</label>
            				<b-progress :value="identify.soal == 1 ? 100 : soal.progress" variant="info" animated show-progress  class="mt-2"></b-progress>
            				<small v-show="identify.soal ? 0 : soal.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.soal ? 0 : soal.step == 2">Step 2 of 2- Memasukkan data ke database</small>
            				<small v-show="identify.soal ? 1 : soal.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 5</label>
            				<b-progress :value="identify.pilihan_soal == 1 ? 100 : jawaban.progress" variant="info" animated show-progress  class="mt-2"></b-progress>
            				<small v-show="identify.pilihan_soal ? 0 : jawaban.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.pilihan_soal ? 0 : jawaban.step == 2">Step 2 of 2- Memasukkan data ke database</small>
            				<small v-show="identify.pilihan_soal ? 1 : jawaban.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 6</label>
            				<b-progress :value="identify.gambar == 1 ? 100 : gambar.progress" variant="info" animated show-progress  class="mt-2"></b-progress>
            				<small v-show="identify.gambar ? 0 : gambar.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.gambar ? 0 : gambar.step == 2">Step 2 of 2- Download file memasukkan data ke directory</small>
            				<small v-show="identify.gambar ? 1 : gambar.step == 3">Complete</small>
            			</div>
            			<div class="form-group">
            				<label>Data 7</label>
            				<b-progress :value="identify.jadwal == 1 ? 100 : jadwal.progress" variant="info" animated show-progress  class="mt-2"></b-progress>
            				<small v-show="identify.jadwal ? 0 : jadwal.step == 1">Step 1 of 2- Download data dari pusat</small>
            				<small v-show="identify.jadwal ? 0 : jadwal.step == 2">Step 2 of 2- Memasukkan data ke database</small>
            				<small v-show="identify.jadwal ? 1 : jadwal.step == 3">Complete</small>
            			</div>
            		</div>
            		<div class="card-footer"></div>
            	</div>
            </div>
          </div>
        </main>
        <b-modal id="modal-selesai">
		    <template v-slot:modal-header="{ close }">
		      <h5>Download status</h5>
		    </template>

		    <template v-slot:default="{ hide }">
		    	<table class="table table-borderless" v-if="center">
		    		<tr>
		    			<td><b>Data 1</b></td>
		    			<td v-text="center.peserta"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.peserta : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 2</b></td>
		    			<td v-text="center.matpel"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.matpel : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 3</b></td>
		    			<td v-text="center.banksoal"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.banksoal : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 4</b></td>
		    			<td v-text="center.soal"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.soal : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 5</b></td>
		    			<td v-text="center.jawaban_soal"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.jawaban_soal : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 6</b></td>
		    			<td v-text="center.gambar"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.gambar : 0 }}</td>
		    		</tr>
		    		<tr>
		    			<td><b>Data 7</b></td>
		    			<td v-text="center.jadwal"></td>
		    			<td>-</td>
		    			<td>{{ count ? count.jadwal : 0 }}</td>
		    		</tr>
		    	</table>
		    </template>

		    <template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="danger" squared @click="cancel()">
		        Tutup
		      </b-button>
		    </template>
		  </b-modal>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
	name: 'Sinkron',
	created() {
		this.connect()
		this.countData()
	},
	components: {
		Loading
	},
	computed: {
		...mapGetters(['isAuth','isLoading']),
		...mapState('pusat',{
			center : state => state.center.data,
			peserta: state => state.peserta,
			matpel: state => state.matpel,
			banksoal: state => state.banksoal,
			soal: state => state.soal,
			jawaban: state => state.jawaban,
			gambar: state => state.gambar,
			jadwal: state => state.jadwal,
			count: state => state.countData.data,
			identify: state => state.identify,
		})
	},
	data() {
      return {
        animate: true,
        sinkron: {
        	peserta: 0,
        	matpel: 0,
        	banksoal: 0,
        	soal: 0,
        	pilihan: 0,
        	gambar: 0,
        	sync: false
        },
		isSync: false,
		syinter: 0,
		cross: 0
      }
    },
	methods: {
		...mapActions('pusat', ['getSinkronServer','testConnection','cbtSync','checkDataLocal']),
		countData() {
			this.checkDataLocal()
			.catch(() => {
				this.notifError('Tidak dapat mengambil data local');
			})
		},
		connect() {
			if(this.identify != '') {
				this.testConnection(this.identify)
				.catch(() => {
					this.notifError('Tidak dapat mengambil data dari server pusat');
				})	
			}
		},
		syncData() {
			this.isSync = true
			if(this.identify.peserta == 0) {
				this.scross+1;
				this.cbtSync('peserta')
				.then(() => {
					this.syinter +=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 1)');
					this.checkSyinter()
				})
			}
			if(this.identify.matpel == 0) {
				this.scross+1;
				this.cbtSync('matpel')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 2)');
					this.checkSyinter()
				})
			}
			if(this.identify.banksoal == 0) {
				this.scross+1;
				this.cbtSync('banksoal')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 3)');
					this.checkSyinter()
				})
			}
			if(this.identify.soal == 0) {
				this.scross+1;
				this.cbtSync('soal')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 4)');
					this.checkSyinter()
				})
			}
			if(this.identify.pilihan_soal == 0) {
				this.scross+1;
				this.cbtSync('jawaban_soal')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 5)');
					this.checkSyinter()
				})
			}
			if(this.identify.gambar == 0) {
				this.scross+1;
				this.cbtSync('file')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 6)');
					this.checkSyinter()
				})
			}
			if(this.identify.jadwal == 0) {
				this.scross+1;
				this.cbtSync('jadwal')
				.then(() => {
					this.syinter+=1;
					this.checkSyinter()
					this.checkSyinter()
				})
				.catch(() => {
					this.syinter+=1;
					this.notifError('Error (DATA 7)');
					this.checkSyinter()
				})
			}
			
		},
		checkSyinter() {
			if(this.syinter == 7) {
				this.isSync = false;
				this.connect()
				this.countData()
				this.syinter = 0;
			}
		},
		notifError(msg) {
			this.$notify({
				group: 'foo',
				title: 'Error',
				type: 'error',
				text: msg ? msg : 'Terjadi kesalahan'
			})
		},
		notifSuccess(msg) {
			this.$notify({
		        group: 'foo',
		        title: 'Sukses',
		        type: 'success',
		        text: msg
		    })
		}
	},
	watch: {
		identify(val) {
			this.connect();
		}
	}
}
</script>