<template>
  <div class="user">
    <h1 class="user_title">Créer un compte</h1>
    <div class="container user_container">
      <form @submit.stop.prevent="handleSubmit">
        <b-field label="Username" message="This username is available">
          <b-input v-model="username" maxlength="30"></b-input>
        </b-field>

        <b-field label="Email" message="This email is invalid">
          <b-input type="email" v-model="email" maxlength="30"> </b-input>
        </b-field>

        <b-field
          label="Password"
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

        <div class="uk-margin">
          <p>
            Vous avez déjà un compte ?
            <router-link :to="{ name: 'users-signin' }">
              Se connecter
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Import mapMutations in order to call mutations from your store
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      loading: false
    };
  },
  methods: {
    // Method that will register your users
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        );
        this.loading = false;
        // Call your setUser mutation from your auth.js store file
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>
