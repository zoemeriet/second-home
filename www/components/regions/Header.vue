<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~/assets/logo.png" alt="" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="nuxt-link" to="/">Accueil</b-navbar-item>
        <b-navbar-dropdown label="Nos produits">
          <b-navbar-item tag="nuxt-link" to="/categories">
            Tous les produits
          </b-navbar-item>
          <b-navbar-item
            tag="nuxt-link"
            v-for="category in categories"
            :key="category.id"
            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
          >
            {{ category.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <template slot="end">
        <b-navbar-dropdown label="User" v-if="username">
          <b-navbar-item @click="logout"> Logout </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="User" v-else>
          <b-navbar-item tag="nuxt-link" to="/users/register">
            S'incrire
          </b-navbar-item>
          <b-navbar-item tag="nuxt-link" to="/users/signin">
            Se connecter
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item tag="div">
          <b-navbar-item tag="nuxt-link" class="e-button" to="/shoppingcart"
            >Mon panier</b-navbar-item
          >
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    // Set your username thanks to your getter
    username() {
      return this.$store.getters["auth/username"];
    },
  },
  methods: {
    // Define your needed mutations, here: auth/logout
    ...mapMutations({
      logout: "auth/logout",
    }),
  },

  data() {
    return {
      categories: [],
      error: null,
    };
  },

  async mounted() {
    try {
      this.categories = await this.$strapi.$categories.find();
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style lang="scss">
.navbar {
  padding: 15px 30px;

  &-brand {
    img {
      max-height: 50px;
    }
  }
}
</style>
