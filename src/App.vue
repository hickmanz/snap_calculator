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
       <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"
            v-on="on"
            class="d-none d-md-flex mx-1">
            <v-icon class="mr-md-1">mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :class="fav ? 'red--text' : ''"
                  icon
                  @click="fav = !fav"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="message"
                  color="purple"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable messages</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="hints"
                  color="purple"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable hints</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="menu = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
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
    fav: true,
    menu: false,
    message: false,
    hints: true
  })
})
</script>
