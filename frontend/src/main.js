import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'

import store from './config/store';
import router from './config/router'


Vue.config.productionTip = false

// TEMP => Token para qualquer requisição que o axios fizer, para o mesmo ir encorporado, no header da requisição
// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFmb25zbyBkYSBTaWx2YSBNYWNoYWRvIiwiZW1haWwiOiJhZm9uc283NzdAaG90bWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTk1ODgzMDAzLCJleHAiOjE1OTYxNDIyMDN9.58gx7sSe3No2Ng6MK1nmtTczQ8AHl0GuNCNyc8mnClg';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')