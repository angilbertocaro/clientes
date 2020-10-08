import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.component('Home', require('./components/Home.vue').default);
Vue.component('Promotores', require('./components/Promotores.vue').default);
Vue.component('Evaluacion', require('./components/Evaluacion.vue').default);
Vue.component('NavBar', require('./components/NavBar.vue').default);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')