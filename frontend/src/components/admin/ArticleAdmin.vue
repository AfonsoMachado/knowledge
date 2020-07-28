<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          placeholder="Informe o Nome do Artigo..."
          :readonly="mode === 'remove'"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Descrição:" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          placeholder="Informe a Descrição do Artigo..."
          :readonly="mode === 'remove'"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-imageUrl">
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          required
          placeholder="Informe a URL da Imagem..."
          :readonly="mode === 'remove'"
        ></b-form-input>
      </b-form-group>

      <!-- COMBOBOX CATEGORIA -->
      <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-categoryId">
        <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId" />
      </b-form-group>

      <!-- COMBOBOX AUTOR -->
      <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-userId">
        <b-form-select id="article-userId" :options="users" v-model="article.userId" />
      </b-form-group>

      <!-- VUE EDITOR -->
      <b-form-group v-if="mode === 'save'" label="Conteúdo:" label-for="article-content">
        <VueEditor v-model="article.content" aria-placeholder="Informe o conteúdo do Artigo..." />
      </b-form-group>

      <!-- Botões de ação -->
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <!-- Tabela de categorias -->
    <b-table hover striped :items="articles" :fields="fields">
      <!-- ìcones de ação -->
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      article: {},
      // Array de categorias
      articles: [],
      categories: [],
      users: [],
      page: 1,
      // quantos elementos aparecem em cada pagina
      limit: 0,
      // quantas paginas precisam
      count: 0,
      // usados pelo componentes b-table. (colunas)
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    // Carrega a lista de categorias do backend
    loadArticles() {
      const url = `${baseApiUrl}/articles`;
      axios.get(url).then((res) => {
        // Capturando categorias do backend
        //this.articles = res.data;
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      // volta para o modo salvar
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      // caso o id estiver setado, o metodo será put. e inserido o id na url
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";

      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          // Dando certo mostra o toast de sucesso
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      // this.article = { ...article };
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((res) => (this.article = res.data));
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        // Capturando usuarios do backend
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
  },
  mounted() {
    this.loadUsers();
    this.loadCategories();
    this.loadArticles();
  },
};
</script>

<style>
</style>