import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axiosPlugin from './plugins/axios';

Vue.use(axiosPlugin);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
