import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
Vue.use(VueFileAgentStyles);


Vue.config.productionTip = false

Vue.component('Home', require('./components/Home.vue').default);
Vue.component('Promotores', require('./components/Promotores.vue').default);
Vue.component('Evaluacion', require('./components/Evaluacion.vue').default);
Vue.component('NavBar', require('./components/NavBar.vue').default);
Vue.component('Read', require('./components/Read.vue').default);
Vue.component('FileIcon', require('./components/FileIcon.vue').default);
Vue.component('Create', require('./components/Create.vue').default);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')