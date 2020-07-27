import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import store from './config/store';
import router from './config/router'


Vue.config.productionTip = false

const xblau = require('axios');

// TEMP => Token para qualquer requisição que o axios fizer, para o mesmo ir encorporado, no header da requisição
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsIm5hbWUiOiJKb8OjbyIsImVtYWlsIjoiam9hb0BnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU5NTgxMjkwNiwiZXhwIjoxNTk2MDcyMTA2fQ.T1JmsWXIhQPLMEfSjM3EJ74eNs7xuT31gAi9uSjH2mw';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')