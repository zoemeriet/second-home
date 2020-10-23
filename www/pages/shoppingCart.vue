<template>
  <main class="shoppingCart u-container main">
    <div v-if="price > 0" class="u-grid">
      <div class="shoppingCart_products">
        <h2 class="e-title2">Mon panier</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Sous total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in selectedDishes" :key="product.id">
              <td class="shoppingCart_products_name">
                <nuxt-link
                  :key="product.id"
                  :to="{
                    name: 'products-slug',
                    params: { slug: product.slug },
                  }"
                >
                  <img
                    :src="getStrapiMedia(product.image[0].url)"
                    alt="Placeholder image"
                  />
                </nuxt-link>
                <span>{{ product.name }}</span>
              </td>
              <td class="shoppingCart_products_price">{{ product.price }}€</td>
              <td class="shoppingCart_products_quantity">
                <span @click="removeFromCart(product)">-</span>
                {{ product.quantity }}
                <span @click="addToCart(product)">+</span>
              </td>
              <td class="shoppingCart_products_price">
                {{ product.price * product.quantity }}€
              </td>
            </tr>
          </tbody>
        </table>
        <nuxt-link to="/categories" class="e-button">
          Continuer mon shopping
        </nuxt-link>
      </div>

      <div class="shoppingCart_resume">
        <h2 class="e-title2">Mon résumé</h2>
        <table>
          <tbody>
            <tr class="shoppingCart_resume_sub">
              <td>Sous-total</td>
              <td>{{ price }}€</td>
            </tr>
            <tr class="shoppingCart_resume_total">
              <td>Total à payer</td>
              <td>{{ price }}€</td>
            </tr>
          </tbody>
        </table>
        <nuxt-link to="/" class="e-button">Commander</nuxt-link>
      </div>
    </div>

    <div v-else>
      <div class="shoppingCart_products">
        <h2 class="e-title2">Mon panier</h2>
        <p>Vous n'avez pas encore ajouté de produit à votre panier</p>
        <nuxt-link to="/categories" class="e-button">
          Commencer mon shopping
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations } from "vuex";
import { getStrapiMedia } from "../utils/medias";

export default {
  methods: {
    getStrapiMedia,
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters["auth/username"];
      if (!isConnected) {
        this.$router.push("/users/signin");
        return;
      }
      this.$router.push("/orders/checkout");
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    selectedDishes() {
      return this.$store.getters["cart/items"];
    },
    price() {
      return this.$store.getters["cart/price"];
    },
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    },
  },
};
</script>

<style lang="scss">
.shoppingCart {
  margin-top: 50px;
  .u-grid {
    @media screen and (min-width: $tablet) {
      grid-template-columns: 2fr 1fr;
      column-gap: 80px;
    }
  }

  .e-title2 {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding-bottom: 30px;
  }

  .e-button {
    margin-top: 30px;
  }

  table {
    min-width: 100%;
    width: auto;

    tbody {
      border-top: 1px solid #d7d8d7;
    }

    td {
      padding: 10px 0;
    }
  }

  &_products {
    &_name {
      display: flex;
      align-items: center;
      a {
        display: inline-block;
        width: 60px;
        img {
          width: 100%;
          height: auto;
        }
      }
      span {
        margin-left: 15px;
      }
    }
    &_quantity,
    &_price {
      text-align: center !important;
      vertical-align: middle;
    }
    thead {
      th {
        font-size: 12px;
        color: #9a9a9a;
        letter-spacing: 0.15em;
        padding: 10px;
        text-align: center;
      }
    }

    tr {
      border-bottom: 1px solid #d7d8d7;
    }
  }

  &_resume {
    table {
      margin-top: 38px;
    }
    tbody {
      border-bottom: 1px solid #d7d8d7;
    }
    td {
      text-transform: uppercase;
    }

    &_sub {
      color: #9a9a9a;
    }

    &_total {
      font-weight: 700;
    }
  }
}
</style>