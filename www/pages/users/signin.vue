<template>
  <div class="user">
    <h1 class="user_title">Se connecter</h1>
    <div class="container user_container">
      <form @submit.stop.prevent="handleSubmit">
        <b-field label="Email" message="This email is invalid">
          <b-input type="email" v-model="email" maxlength="30"> </b-input>
        </b-field>

        <b-field
          label="Mot de passe"
          :message="[
            'Password is too short',
            'Password must have at least 8 characters'
          ]"
        >
          <b-input type="password" v-model="password" maxlength="30"></b-input>
        </b-field>

        <div class="user_submit">
          <button class="e-button" :disabled="loading" type="submit">
            Submit
          </button>
        </div>

        <div class="user_redirect">
          <p>
            Vous n'avez pas de compte ?
            <router-link :to="{ name: 'users-register' }">
              Créer un compte
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.login(this.email, this.password);
        this.loading = false;
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>
