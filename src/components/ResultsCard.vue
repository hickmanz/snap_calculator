<template>
  <div>
    <v-card>
      <v-card-title class="headline">
          Results
      </v-card-title>
      <v-container>
        <v-row  v-for="result in activeResults" :key="result.value">
          <v-col cols="12" md="6">
              {{ result.name}} ({{ result.variable }}) -
          </v-col>
          <v-col cols="12" md="6">
              {{ formatResult(result) }} {{ getUnits(result) }}
          </v-col>
        </v-row>
        <v-row >
          <li v-for="(error, index) in activeErrors" :key="index">
            {{ error }}
          </li>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { MaterialData } from '@/store/materials/types'
import { InputData, ResultsData } from '@/store/types'

export default Vue.extend({
  name: 'Inputs',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState(['snapType', 'snapOptions', 'inputs', 'units', 'unitAssignment', 'calculationSequences']),
    ...mapGetters(['activeInputs', 'activeErrors', 'activeResults'])
  },
  methods: {
    updateSnapType (type: object) {
      this.$store.commit('updateSnapType', type)
    },
    getUnits (input: InputData): string {
      return this.unitAssignment[this.units][input.measurementType]
    },
    updateCalculation (calcMethod: MaterialData) {
      this.$store.commit('updateCalculation', calcMethod)
    },
    formatResult (result: ResultsData) {
      if (result.value) {
        if (result.measurementType === 'strain') {
          return (result.value * 100).toFixed(1)
        }
        return result.value.toFixed(2)
      }
    }
  }
})
</script>
