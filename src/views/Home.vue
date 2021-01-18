<template>
  <v-container fluid class="constrained-width px-2 px-sm-4">
    <v-row class="mt-0 mt-sm-2">
      <v-col cols="12" md="4" class="pt-0">
        <snap-type-card />
      </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <inputs-card />
      </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <results-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import SnapTypeCard from '@/components/SnapTypeCard.vue'
import InputsCard from '@/components/InputsCard.vue'
import ResultsCard from '@/components/ResultsCard.vue'

@Component({
  components: {
    HelloWorld,
    SnapTypeCard,
    InputsCard,
    ResultsCard
  }
})
export default class Home extends Vue {}
</script>
