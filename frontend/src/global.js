import Vue from 'vue';

// Apontando para o backend
export const baseApiUrl = 'http://localhost:3000'

// Função para tratar mensagem de error
export function showError(e) {
  // Testando erros em cenarios comuns
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data })
    // Caso o erro seja uma string
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e })
  } else {
    Vue.toasted.global.defaultError()
  }
}

// export default { baseApiUrl, showError }