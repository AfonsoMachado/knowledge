<template>
  <div class="user-admin">
    <b-table hover striped :items="users" :fields="fields"></b-table>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  data: function () {
    return {
      mode: "save",
      user: {},
      // Array de usuarios
      users: [],
      // usados pelo componentes b-table. (colunas)
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Aministrador",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    // Carrega a lista de usuarios do backend
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        // Capturando usuarios do backend
        this.users = res.data;
      });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>