<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <!-- 6 Colunas de bootstrap -->
      <b-row>
        <!-- se for um dispositivo small, ocupa 12 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Informe o Nome do Usuário..."
              :readonly="mode === 'remove'"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!-- mais 6 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Informe o E-mail do Usuário..."
              :readonly="mode === 'remove'"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox v-model="user.admin" class="mt-3 mb-3" v-if="mode === 'save'">Administrador?</b-form-checkbox>
      <b-form-checkbox
        v-model="user.admin"
        class="mt-3 mb-3"
        onclick="return false;"
        v-else
      >Administrador</b-form-checkbox>

      <!-- Parte de senha, mostra somemte se o modo for 'save -->
      <b-row v-show="mode === 'save'">
        <!-- se for um dispositivo small, ocupa 12 colunas -->
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
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
          <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
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
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <hr />

    <!-- Tabela de usuarios -->
    <b-table hover striped :items="users" :fields="fields">
      <!-- ìcones de ação -->
      <template slot="actions" slot-scope="data">
        <!-- data.item é o item selecionado na linha -->
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
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
    save() {
      // caso o id estiver setado, o metodo será put. e inserido o id na url
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";

      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          // Dando certo mostra o toast de sucesso
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>