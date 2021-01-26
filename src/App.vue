<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/components/AppBar.vue'
import { localConfig } from '@/main'

@Component({
  components: {
    AppBar
  }
})

export default class App extends Vue {
  fav= true
  menu= false
  message= false
  hints= true

  mounted () {
    this.$vuetify.theme.dark = this.$store.state.config.generalConfig.darkMode
  }
}

</script>
