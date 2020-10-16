<template>
  <nuxt-link
    :key="product.id"
    :to="{ name: 'products-slug', params: { slug: product.slug } }"
  >
    <div class="card">
      <div class="card_image">
        <img
          :src="getStrapiMedia(product.image[0].url)"
          alt="Placeholder image"
        />
      </div>
      <div class="card_content">
        <p class="card_title">{{ product.name }}</p>
        <p class="card_price">{{ product.price }} €</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { getStrapiMedia } from "../../utils/medias";

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getStrapiMedia,
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 30px;
  background-color: transparent;
  box-shadow: none;

  &_image {
    height: 200px;
    background-color: $grey-light;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &_content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  &_title {
    flex: 1;
    font-weight: 600;
  }

  &_price {
    margin-left: 20px;
  }
}
</style>
