<template>
  <div>
    <v-card>
      <v-card-title class="headline">
          Inputs
      </v-card-title>
      <v-container>
        <v-row >
          <v-col cols="12">
            <v-select
            :items="calculationSequences"
            :value="calculationSequences"
            @input="updateCalculation"
            label="Solving for"
            return-object
            ></v-select>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12">
            <v-text-field v-for="input in activeInputs" :key="input.id"
                :label="`${input.name} (${input.variable})`"
                outlined
                :value="input.value"
                @input="updateInput($event, input.id)"
                :suffix="getUnits(input)"
                type="number"
                return-object
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import { MaterialData } from '@/store/materials/types'
import { InputData } from '@/store/types'

export default {
  name: 'Inputs',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState(['snapType', 'snapOptions', 'inputs', 'units', 'unitAssignment', 'calculationSequences']),
    ...mapGetters(['activeInputs'])
  },
  methods: {
    updateSnapType (type: object) {
      this.$store.commit('updateSnapType', type)
    },
    getUnits (input: InputData) {
      return this.unitAssignment[this.units][input.measurementType]
    },
    updateCalculation (calcMethod: MaterialData) {
      this.$store.dispatch('updateCalculation', calcMethod)
    },
    updateInput (data: number, id: number) {
      const payload = { value: data, id: id }
      this.$store.dispatch('updateInput', payload)
    }
  }
}
</script>
