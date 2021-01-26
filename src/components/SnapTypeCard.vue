<template>
    <div>
        <v-card>
            <v-card-title class="headline">
                Snap Details
            </v-card-title>
            <v-container>
                <v-row >
                     <v-col cols="12">
                        <v-select
                        :items="snapOptions"
                        :reduce="snapOptions => snapOptions.name"
                        :value="snapType"
                        @input="updateSnapType"
                        label="Snap Type"
                        return-object
                        ></v-select>
                     </v-col>
                </v-row>
                <v-row v-show="this.snapType">
                    <v-col cols="12" md="6">
                            <img :src="snapImage" alt='picture'/>
                    </v-col>
                    <v-col cols="12" md="6">
                            <v-card-text>
                                Description of snap
                            </v-card-text>
                    </v-col>
                </v-row>
                <v-row >
                     <v-col cols="12">
                        <v-autocomplete
                        :items="materials"
                        :value="selectedMaterial"
                        @input="updateMaterial"
                        label="Material"
                        return-object
                        ></v-autocomplete>
                     </v-col>
                </v-row>
                <v-btn
                  color="primary.lighten"
                  elevation="2"
                  small
                  :disabled="materialEdit"
                >edit materials</v-btn>
            </v-container>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { MaterialData } from '@/store/materials/types'
import { SnapType } from '@/store/types'

export default Vue.extend({
  name: 'SnapType',
  data: () => ({
    materialEdit: true
  }),
  computed: {
    ...mapState(['snapType', 'snapOptions', 'inputs', 'materials', 'selectedMaterial']),
    snapImage () {
      if (!this.snapType) {
        return ''
      }
      const fileName: string = this.snapType.image
      return require(`../assets/snaptype/${fileName}`)
    }
  },
  methods: {
    updateSnapType (type: SnapType) {
      this.$store.dispatch('updateSnapType', type)
    },
    updateMaterial (material: MaterialData) {
      this.$store.dispatch('updateMaterial', material)
    },
    setSnapType () {
      if (this.snapType) {
        return this.snapType
      } else {
        return {}
      }
    }
  }
})
</script>
