import Vue from 'vue';
import UIkit from 'uikit';
import('uikit/dist/css/uikit.css');

window.UIkit = UIkit;

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
