<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article" />
      </li>
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
import ArticleItem from "./ArticleItem";

export default {
  name: "ArticlesBycategory",
  components: { PageTitle, ArticleItem },
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
  watch: {
    // parametros para quando mudar de pagina
    // executa sempre que a rota mudar
    $route(to) {
      this.category.id = to.params.id
      this.articles = []
      this.page = 1
      this.loadMore = true

      this.getCategory()
      this.getArticles()
    }
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