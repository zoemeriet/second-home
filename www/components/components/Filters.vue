<template>
  <section>
    <!-- <p class="content"><b>selected</b>: {{ selectedMaterials }}</p>
     -->
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

    <b-dropdown v-model="selectedMaterials" multiple aria-role="list">
      <button class="button is-primary" type="button" slot="trigger">
        <span>Materials</span>
        <b-icon icon="menu-down"></b-icon>
      </button>
      <b-dropdown-item
        v-for="material in materials"
        :key="material.id"
        :value="material.slug"
        aria-role="listitem"
      >
        <span>{{ material.name }}</span>
      </b-dropdown-item>
    </b-dropdown>

    <b-dropdown v-model="selectedStyles" multiple aria-role="list">
      <button class="button is-primary" type="button" slot="trigger">
        <span>Styles</span>
        <b-icon icon="menu-down"></b-icon>
      </button>
      <b-dropdown-item
        v-for="style in styles"
        :key="style.id"
        :value="style.slug"
        aria-role="listitem"
      >
        <span>{{ style.name }}</span>
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
      materials: [],
      selectedMaterials: [],
      styles: [],
      selectedStyles: [],
      error: null,
    };
  },
  async mounted() {
    try {
      this.colors = await this.$strapi.$colors.find();
      this.materials = await this.$strapi.$materials.find();
      this.styles = await this.$strapi.$styles.find();
      // this.emit(selectedColors);
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style lang="scss"></style>
