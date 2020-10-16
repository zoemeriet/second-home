<template>
  <section class="category">
    <div class="category_header">
      <img
        :src="getStrapiMedia(category.image[0].url)"
        alt="Placeholder image"
      />
      <div class="container">
        <h1 class="e-title1">{{ category.name }}</h1>
      </div>
    </div>

    <div>
      <Filters />
    </div>

    <section class="u-container">
      <div class="u-grid">
        <Card
          v-for="product in products"
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
  async asyncData({ $strapi, params, error }) {
    try {
      const matchingCategories = await $strapi.find("categories", {
        slug: params.slug,
      });
      return {
        category: matchingCategories[0],
        products: await $strapi.find("products", {
          "category.slug": params.slug,
        }),
      };
    } catch (error) {
      this.error = error;
    }
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
}
</style>
