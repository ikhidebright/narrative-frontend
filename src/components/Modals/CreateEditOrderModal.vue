<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <nio-card>
        <v-card-text>
          <h3 class="mb-5">{{ capitalizeText(type) }} Order</h3>
          <v-row>
            <v-col cols="12">
              <nio-text-field v-model="orderName" label="Name"></nio-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <nio-select
                class="select"
                v-model="selectedItem"
                :items="packageTypes"
                label="Choose an item"
              ></nio-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <nio-text-field
                type="number"
                v-model.number="orderMaxBigPrice"
                label="Maximum Bid Price ($)"
              ></nio-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('close')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </nio-card>
    </v-dialog>
  </v-row>
</template>

<script>
import utilityMixin from "@/mixins/utility";

export default {
  data: () => ({
    packageTypes: ["Device Location", "Device Behavior", "ID Mapping"],
  }),
  mixins: [utilityMixin],
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
