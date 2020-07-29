import Vue from 'vue';
import VueMq from 'vue-mq';

// Breakpoints para responsividade
Vue.use(VueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1140,
    xl: Infinity
  }
})