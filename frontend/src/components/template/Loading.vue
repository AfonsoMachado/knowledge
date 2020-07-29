<template>
  <div class="loading">
    <!-- Componente de loading -->
    <img src="@/assets/loading.gif" alt="Loading" />
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
/* Ocupando a mesma area do content */
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>