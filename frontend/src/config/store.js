// área de armazenamento, para compartilhar entre os componentes
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: true,
    user: {
      name: 'Usuário Mock',
      email: 'mock@gmail.com'
    }
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible
      } else {
        state.isMenuVisible = isVisible
      }
      console.log('toggleMenu = ' + state.isMenuVisible);
    }
  },
})