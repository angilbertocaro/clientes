import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import VeeValidate, { Validator } from "vee-validate";
import es from 'vee-validate/dist/locale/es';

Validator.localize({ es: es });

Vue.use(VeeValidate, {
    locale: "es",
    events: ""
});

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
Vue.component('Update', require('./components/Update.vue').default);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')