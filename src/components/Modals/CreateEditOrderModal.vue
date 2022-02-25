<template>
  <v-row justify="center">
    <v-dialog v-model="showEditCreateModal" persistent max-width="600px">
      <nio-card>
        <form>
          <v-card-text>
            <h3 class="mb-5">
              {{ capitalizeText(showEditCreateModalType) }} Order
            </h3>
            <v-row>
              <v-col cols="12">
                <nio-text-field
                  v-model="formOrderData.name"
                  label="Name"
                  :rules="[rules.required]"
                ></nio-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <nio-select
                  class="select"
                  v-model="formOrderData.data_package_type"
                  :items="packageTypes"
                  label="Choose an item"
                  :rules="[rules.required]"
                ></nio-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <nio-text-field
                  type="text"
                  v-model="formOrderData.max_bid_price"
                  label="Maximum Bid Price ($)"
                  :rules="[rules.required]"
                ></nio-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="closeModal()">
              Close
            </v-btn>
            <v-btn
              type="submit"
              color="green darken-1"
              text
              @click.prevent="handleOkayButton"
            >
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </nio-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import utilityMixin from "@/mixins/utility";
import { baseOrderUrl } from "@/services/resource/order";

export default {
  data: () => ({
    formOrderData: {
      name: "",
      data_package_type: "",
      max_bid_price: "",
    },
    packageTypes: ["Device Location", "Device Behavior", "ID Mapping"],
    rules: {
      required: (value) => !!value || "Required",
      counter(value) {
        return value.length > 3 || "Minimun 3 characters";
      },
    },
  }),
  mixins: [utilityMixin],
  props: {},
  computed: {
    ...mapState("orders", ["showEditCreateModalType", "showEditCreateModal"]),
  },
  methods: {
    ...mapActions("orders", ["setUpdateOrders", "orderToEdit"]),
    closeModal() {
      this.orderToEdit({
        data: {},
        show: false,
        typeOfRequest: "create",
      });
    },
    async handleOkayButton() {
      try {
        if (this.showEditCreateModalType === "create") {
          await this.$http.post(baseOrderUrl, this.formOrderData);
          this.setUpdateOrders(true);
          this.closeModal();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
