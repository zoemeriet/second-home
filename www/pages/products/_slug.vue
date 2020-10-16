<template>
  <div>
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
        <h1 class="e-title1">{{ product.name }}</h1>
        <p>{{ product.price }} €</p>
        <button class="e-button" @click="addToCart(product)">
          Ajouter au panier
        </button>
        <div>
          <h2 class="e-title2">Details</h2>
          <div>{{ product.description }}</div>

          <div v-if="product.material">
            <h3 class="e-title3">Materiaux</h3>
            {{ product.material.name }}
          </div>

          <div v-if="product.color">
            <h3 class="e-title3">Couleur</h3>
            {{ product.color.name }}
          </div>

          <div v-if="product.style">
            <h3 class="e-title3">Style</h3>
            {{ product.style.name }}
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
        slug: params.slug
      });
      return {
        product: matchingProducts[0]
      };
    } catch (error) {
      this.error = error;
    }
  },

  data() {
    return {
      apiUrl: process.env.strapiBaseUri
    };
  },

  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove"
    }),
    getStrapiMedia
  }
};
</script>

<style lang="scss"></style>
