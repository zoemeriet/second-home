<template>
  <div class="product u-container">
    <div class="columns">
      <div class="column">
        <b-carousel :indicator-inside="false">
          <b-carousel-item v-for="image in product.image" :key="image.id">
            <span class="image">
              <img :src="getStrapiMedia(image.url)" />
            </span>
          </b-carousel-item>
        </b-carousel>
      </div>

      <div class="column">
        <h1 class="product_title">{{ product.name }}</h1>
        <p class="product_price">{{ product.price }} €</p>
        <button class="product_btn e-button" @click="addToCart(product)">
          Ajouter au panier
        </button>
        <div class="product_description">
          <h2 class="product_subtitle">Details</h2>
          <p>{{ product.description }}</p>

          <div v-if="product.material">
            <h3 class="product_subtitle">Materiaux</h3>
            <p>{{ product.material.name }}</p>
          </div>

          <div v-if="product.color">
            <h3 class="product_subtitle">Couleur</h3>
            <p>{{ product.color.name }}</p>
          </div>

          <div v-if="product.style">
            <h3 class="product_subtitle">Style</h3>
            <p>{{ product.style.name }}</p>
          </div>
        </div>
      </div>

      <child-comp @askParentToDoStuff="doStuff"> </child-comp>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "../../utils/medias";
import { mapMutations } from "vuex";

export default {
  async asyncData({ $strapi, params, error }) {
    try {
      const matchingProducts = await $strapi.find("products", {
        slug: params.slug,
      });
      return {
        product: matchingProducts[0],
      };
    } catch (error) {
      this.error = error;
    }
  },

  data() {
    return {
      apiUrl: process.env.strapiBaseUri,
    };
  },

  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    getStrapiMedia,
  },
};
</script>

<style lang="scss">
.product {
  margin-top: 50px;
  margin-bottom: 50px;

  &_title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding-bottom: 10px;
  }

  &_price {
    font-size: 24px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  &_btn {
    margin-bottom: 20px;
  }

  &_description {
    margin-top: 20px;
    padding-top: 30px;
    border-top: 1px solid #9a9a9a;

    p {
      font-size: 14px;
    }
  }

  &_subtitle {
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 600;
  }
}
</style>
