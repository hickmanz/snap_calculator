<template>
  <v-app>
    <v-app-bar
      app
      color="tertiary"
      dark
    >
      <div class="d-flex align-center">
        <img src="./assets/logo.png" alt='picture'/>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
})
</script>
