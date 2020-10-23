<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="~/assets/logo.png" alt="" />
      </b-navbar-item>
    </template>
    <template slot="start">
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
      <b-navbar-item tag="nuxt-link" to="/"> Le concept </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/"> Contact </b-navbar-item>
    </template>
    <template slot="end">
      <b-dropdown aria-role="list" v-if="username">
        <button class="button" slot="trigger">
          <b-icon icon="account-outline"></b-icon>
        </button>
        <b-dropdown-item aria-role="listitem" @click="logout">
          Se déconnecter
        </b-dropdown-item>
      </b-dropdown>
      <b-dropdown aria-role="list" v-else>
        <button class="button" slot="trigger">
          <b-icon icon="account-outline"></b-icon>
        </button>
        <b-dropdown-item aria-role="listitem">
          <nuxt-link to="/users/register">S'incrire</nuxt-link>
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem">
          <nuxt-link to="/users/signin">Se connecter</nuxt-link>
        </b-dropdown-item>
      </b-dropdown>
      <nuxt-link to="/shoppingcart">
        <button class="button">
          <b-icon icon="cart-minus"></b-icon>
        </button>
      </nuxt-link>
    </template>
  </b-navbar>
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
  background-color: #fafafa;

  &-brand {
    img {
      max-height: 50px;
    }
  }

  &-end {
    align-items: center;

    button {
      border: none;
      margin-left: 20px;
    }

    .dropdown-menu {
      left: -50%;
    }
  }

  &-link {
    &:hover {
      color: $primary-color;
      background-color: transparent;
    }
  }

  &-link:not(.is-arrowless)::after {
    border-color: $black;
  }
}

a.navbar-item:hover,
div.navbar-item:hover {
  color: $primary-color;
  background-color: transparent;
}
</style>
