<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <!-- 6 Colunas de bootstrap -->
      <b-row>
        <!-- se for um dispositivo small, ocupa 12 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="Nome" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Informe o Nome do Usuário..."
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!-- mais 6 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="E-mail" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Informe o E-mail do Usuário..."
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3">Administrador?</b-form-checkbox>

      <!-- Parte de senha -->
      <b-row>
        <!-- se for um dispositivo small, ocupa 12 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="Senha" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe a Senha do Usuário..."
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!-- mais 6 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de Senha" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a Senha do Usuário..."
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Botões de ação -->
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <hr />

    <!-- Tabela de usuarios -->
    <b-table hover striped :items="users" :fields="fields"></b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
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
    reset() {
      // volta para o modo salvar
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>