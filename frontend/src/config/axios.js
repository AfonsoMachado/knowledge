import axios from 'axios';

const success = (res) => res;

const error = (err) => {
  if (401 === err.response.status) {
    // recarrega a pagina para verificar novamente o token
    // caso esteja expeirado, vai para a tela de login
    window.location = '/';
  } else {
    return Promise.reject(err);
  }
};

axios.interceptors.response.use(success, error);
