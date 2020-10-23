<template>
  <div class="homepage u-container">
    <div class="homepage_intro">
      <h1 class="homepage_title">
        Les plus belles pièces de déco de seconde main sont ici !
      </h1>
      <nuxt-link to="/categories" class="e-button">Voir les produits</nuxt-link>
    </div>

    <div class="u-grid col">
      <img src="~/assets/homepage1.jpg" alt="Placeholder image" />
      <div class="u-grid decoration">
        <div
          v-for="product in products_decoration"
          :key="product.id"
          class="decoration_item"
        >
          <img
            :src="getStrapiMedia(product.image[0].url)"
            alt="Placeholder image"
          />
        </div>
        <div class="decoration_text">
          <h2 class="e-title2">Un peu de décoration</h2>
          <nuxt-link to="/categories/decoration" class="e-button"
            >Découvrir</nuxt-link
          >
        </div>
      </div>
    </div>

    <div class="u-grid col">
      <div class="u-grid decoration">
        <div
          v-for="product in products_linge"
          :key="product.id"
          class="decoration_item"
        >
          <img
            :src="getStrapiMedia(product.image[0].url)"
            alt="Placeholder image"
          />
        </div>
        <div class="decoration_text">
          <h2 class="e-title2">Du linge de maison vintage</h2>
          <nuxt-link to="/categories/linge-de-maison" class="e-button"
            >Découvrir</nuxt-link
          >
        </div>
      </div>
      <img src="~/assets/homepage2.jpg" alt="Placeholder image" />
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "../utils/medias";

export default {
  data() {
    return {
      homepage: [],
      products: [],
      products_decoration: [],
      products_linge: [],
      error: null,
    };
  },

  async mounted() {
    try {
      this.homepage = await this.$strapi.find("homepage");
      this.products = await this.$strapi.$products.find();
      this.products_decoration = await this.$strapi.$products.find({
        _limit: 4,
        "category.slug": "decoration",
      });
      this.products_linge = await this.$strapi.$products.find({
        _limit: 4,
        "category.slug": "linge-de-maison",
      });
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
.homepage {
  padding-top: 50px;

  &_intro {
    margin-bottom: 50px;

    .e-button {
      margin-top: 30px;
    }
  }
  &_title {
    font-size: 2.8rem;
  }
}
.col {
  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
  }
}
.decoration {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 30px;

  &_item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &_text {
    grid-area: 3 / 1 / 4 / 3;
    text-align: center;

    .e-title2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
  }
}
</style>
