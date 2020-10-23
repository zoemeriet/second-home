<template>
  <section class="category">
    <div class="category_header">
      <img
        v-if="category.image"
        :src="getStrapiMedia(category.image.url)"
        alt="Placeholder image"
      />
      <div class="container">
        <h1 class="e-title1">{{ category.name }}</h1>
      </div>
    </div>

    <div class="filters u-container">
      <b-dropdown v-model="selectedColors" aria-role="list">
        <button class="button" type="button" slot="trigger">
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

      <b-dropdown v-model="selectedMaterials" aria-role="list">
        <button class="button" type="button" slot="trigger">
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

      <b-dropdown v-model="selectedStyles" aria-role="list">
        <button class="button" type="button" slot="trigger">
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
    </div>

    <section class="u-container">
      <div class="u-grid">
        <Card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </section>
</template>

<script>
import { getStrapiMedia } from "../../utils/medias";

export default {
  data() {
    return {
      category: [],
      products: [],
      colors: [],
      selectedColors: [],
      materials: [],
      selectedMaterials: [],
      styles: [],
      selectedStyles: [],
    };
  },

  async mounted() {
    try {
      const matchingCategory = await this.$strapi.$categories.find({
        slug: this.$route.params.slug,
      });
      this.category = matchingCategory[0];
      this.products = await this.$strapi.$products.find({
        "category.slug": this.$route.params.slug,
      });
      this.colors = await this.$strapi.$colors.find();
      this.materials = await this.$strapi.$materials.find();
      this.styles = await this.$strapi.$styles.find();
    } catch (error) {
      this.error = error;
    }
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        if (
          product.color.slug.includes(this.selectedColors) &&
          product.material.slug.includes(this.selectedMaterials) &&
          product.style.slug.includes(this.selectedStyles)
        ) {
          return product;
        }
      });
    },
  },

  methods: {
    getStrapiMedia,
  },
};
</script>

<style lang="scss">
.category {
  &_header {
    position: relative;
    height: 300px;
    margin-bottom: 50px;

    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba($color: $black, $alpha: 0.3);
      content: "";
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  .u-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  button {
    font-size: 16px;
    text-transform: uppercase;
    border: none;
    border-radius: 0;
  }

  .dropdown {
    &:not(:last-child) {
      border-right: 1px solid #d7d8d7;
    }
  }
}
</style>
