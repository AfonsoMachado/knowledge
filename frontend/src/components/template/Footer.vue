<template>
  <footer class="footer">
    <span>
      Copyright
      <a href="https://www.udemy.com/course/curso-web/">Cod3r</a> © 2020 |
      <a href="https://github.com/AfonsoMachado">
        <img src="@/assets/github.png" width="15" /> AfonsoMachado
      </a>
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
}

.footer a {
  color: #555;
  font-weight: bold;
}
.footer a:hover {
  color: #999;
  text-decoration: none;
}
</style>