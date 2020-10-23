<template>
  <footer class="footer">
    <div class="footer_links">
      <ul>
        <li>CGV</li>
        <li>Politique de confidentialité</li>
        <li>Mentions légales</li>
      </ul>
    </div>
    <div class="footer_copyright">© Second Home 2020</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding-bottom: 50px;

  &_links {
    ul {
      display: flex;
      li:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>
