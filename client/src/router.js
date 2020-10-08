import Vue from 'vue';
import Router from 'vue-router';
import Home from "./components/Home.vue";
import Promotores from "./components/Promotores.vue";
import Evaluacion from "./components/Evaluacion.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes : [
        {
            path: "/",
            name: "inicio",
            component: Home
        },
        {
            path: "/promotores",
            name: "promotores",
            component: Promotores
        },
        {
            path: "/evaluacion",
            name: "evaluacion",
            component: Evaluacion
        },
    ]
});