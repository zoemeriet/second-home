<template>
  <section>
    <p class="content"><b>selected</b>: {{ selectedColors }}</p>
    <b-dropdown v-model="selectedColors" multiple aria-role="list">
      <button class="button is-primary" type="button" slot="trigger">
        <span>Couleurs</span>
        <b-icon icon="menu-down"></b-icon>
      </button>

      <b-dropdown-item
        v-for="color in colors"
        :key="color.id"
        :value="color.slug"
        aria-role="listitem"
      >
        <span>{{ color.name }}</span>
      </b-dropdown-item>
    </b-dropdown>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colors: [],
      selectedColors: [],
      error: null
    };
  },
  async mounted() {
    try {
      this.colors = await this.$strapi.$colors.find();
    } catch (error) {
      this.error = error;
    }
  }
};
</script>

<style lang="scss"></style>
