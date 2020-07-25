<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
// para mapear usuário do store.js
import { mapState } from "vuex";

export default {
  name: "Menu",
  // Mapeando a função isMenuVisible, pegando os atributos do estado
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>