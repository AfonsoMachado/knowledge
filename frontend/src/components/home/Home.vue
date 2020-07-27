<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
    <div class="stats">
      <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
      <Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480" />
      <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  // Registrando componentes
  components: { PageTitle, Stat },
  // Estado interno, obtido através de um requisição para o backend
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      // Dados vem a partir da resposta, e é setada a propriedades this.stat
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },
  // Funçao chamada no momento em que o componente for renderizado
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>