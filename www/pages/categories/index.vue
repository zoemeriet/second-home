<template>
  <section class="category">
    <div class="category_header">
      <img
        :src="getStrapiMedia(all_products.image[0].url)"
        alt="Placeholder image"
      />
      <div class="container">
        <h1 class="e-title1">{{ all_products.title }}</h1>
      </div>
    </div>
    <div class="u-container">
      <div class="u-grid">
        <Card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getStrapiMedia } from "../../utils/medias";

export default {
  async asyncData({ $strapi }) {
    return {
      all_products: await $strapi.find("all-products"),
      products: await $strapi.find("products"),
    };
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
</style>
