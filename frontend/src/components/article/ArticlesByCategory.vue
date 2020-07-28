<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
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
  },
  mounted() {
    // console.log(this.$route.params.id);

    // Setando o ID na rota
    this.category.id = this.$route.params.id;
    this.getCategory();
  },
};
</script>

<style>
</style>