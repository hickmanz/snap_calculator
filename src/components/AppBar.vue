<template>
    <v-app-bar
      app
      color="tertiary"
      dark
    >
      <div class="d-flex align-center">
        <img src="@/assets/logo.png" alt='picture'/>
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
            icon>
            <v-icon >mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch
                  :input-value="generalConfig.darkMode"
                  @change="updateDarkMode"
                  hint="This toggles the global state of the Vuetify theme"
                  inset
                  label=" Enable dark theme"
                ></v-switch>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="hints"
                  inset
                  label="Show material data"
                  :disabled="material"
                ></v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              @click="menu = false"
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="saveSettings"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'AppBar',
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    material: true,
    hints: false
  }),
  computed: {
    ...mapState('config', ['generalConfig'])
  },
  methods: {
    ...mapActions('config', ['saveGeneralConfig', 'updateDarkMode']),
    saveSettings () {
      this.saveGeneralConfig()
      this.menu = false
    }
  }
})
</script>
