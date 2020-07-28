<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    <ul>
      <li v-for="article in articles" :key="article.id">{{article.name}}</li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >Carregar Mais Artigos</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "ArticlesBycategory",
  components: { PageTitle },
  data: function () {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true,
    };
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      axios(url).then((res) => (this.category = res.data));
    },
    getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`;

      axios(url).then((res) => {
        // Acrescentando novos dados ao this.articles
        this.articles = this.articles.concat(res.data);
        // Acrescentando pagina, para na proxima requisição sempre pegar a proxima pagina
        this.page++;

        // Caso não haja mais artigos, retira o botao load more
        if (res.data.length === 0) this.loadMore = false;
      });
    },
  },
  mounted() {
    // console.log(this.$route.params.id);

    // Setando o ID na rota
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  },
};
</script>

<style>
.articles-by-category ul {
  list-style-type: none;
  padding: 0;
}

.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>