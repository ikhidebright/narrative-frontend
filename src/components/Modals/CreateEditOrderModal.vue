<template>
  <v-row justify="center">
    <v-dialog v-model="showEditCreateModal" persistent max-width="600px">
      <nio-card>
        <v-form ref="form" v-model="valid">
          <v-card-text>
            <h3 class="mb-5">
              {{ capitalizeText(showEditCreateModalType) }} Order
            </h3>
            <v-row>
              <v-col cols="12">
                <nio-text-field
                  v-model="formOrderData.name"
                  label="Name"
                  :rules="[(v) => !!v || 'Required']"
                ></nio-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <nio-select
                  class="select"
                  v-model="formOrderData.data_package_type"
                  :items="packageTypes"
                  :rules="[(v) => !!v || 'Required']"
                  label="Select data package type"
                ></nio-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <nio-text-field
                  v-model="pAmount"
                  type="text"
                  label="Maximum Bid Price"
                  :rules="[(v) => !!v || 'Required']"
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
              :disabled="!valid || !formOrderData.data_package_type"
              type="submit"
              color="green darken-1"
              text
              @click.prevent="handleOkayButton"
            >
              <v-progress-circular
                v-if="createEditLoading"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-else> Save </span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </nio-card>
    </v-dialog>
  </v-row>
</template>

<script>
import miscMixin from "@/mixins/misc";
import { mapState, mapActions } from "vuex";
import utilityMixin from "@/mixins/utility";
import { baseOrderUrl } from "@/services/resource/order";

export default {
  data: () => ({
    valid: true,
    max_bid: null,
    createEditLoading: false,
    formOrderData: {
      name: "",
      data_package_type: null,
      max_bid_price: "",
    },
    packageTypes: ["Device Location", "Device Behavior", "ID Mapping"],
  }),
  mixins: [utilityMixin, miscMixin],
  props: {},
  computed: {
    ...mapState("orders", [
      "showEditCreateModalType",
      "showEditCreateModal",
      "currentOrderItemToEdit",
    ]),
    pAmount: {
      get() {
        let val = parseInt(this.max_bid);
        val = val.toLocaleString();
        if (val === "NaN") {
          return "";
        } else {
          return `$${val}`;
        }
      },
      set(val) {
        // check if the first Character is $ and remove it
        const firstChar = val.charAt(0);
        if (firstChar === "$") {
          val = val.substring(1);
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(",").join("");
          val = parseInt(val);
          this.max_bid = val;
        }
      },
    },
  },
  watch: {
    showEditCreateModal(v) {
      this.max_bid = this.currentOrderItemToEdit.max_bid_price;
      if (v && this.showEditCreateModalType === "update") {
        Object.entries(this.currentOrderItemToEdit).forEach(([key, val]) => {
          if (key !== "id") this.$set(this.formOrderData, key, val);
        });
      }
    },
  },
  methods: {
    ...mapActions("orders", [
      "setUpdateOrders",
      "setSuccessfulEditedOrder",
      "orderToEdit",
    ]),
    closeModal() {
      this.orderToEdit({
        data: {},
        show: false,
        typeOfRequest: "",
      });
      this.max_bid = null;
      this.formOrderData.name = "";
      this.formOrderData.data_package_type = "";
      this.formOrderData.max_bid_price = "";
    },
    async handleOkayButton() {
      this.createEditLoading = true;
      let details = {
        id: this.currentOrderItemToEdit.id,
        name: this.formOrderData.name,
        max_bid_price: this.formOrderData.max_bid_price,
        data_package_type: this.formOrderData.data_package_type,
      };
      try {
        this.formOrderData.max_bid_price = String(this.max_bid);
        if (this.showEditCreateModalType === "create") {
          await this.$http.post(baseOrderUrl, this.formOrderData);
          this.setUpdateOrders(true);
          this.createEditLoading = false;
          this.closeModal();
          this.showSnack("Order added successfully", "success");
        } else if (this.showEditCreateModalType === "update") {
          await this.$http.put(
            `${baseOrderUrl}/${this.currentOrderItemToEdit.id}`,
            this.formOrderData
          );
          this.setSuccessfulEditedOrder({
            data: details,
            edit: true,
          });
          this.createEditLoading = false;
          this.closeModal();
          this.showSnack("Order Edited successfully", "success");
        }
      } catch (error) {
        this.createEditLoading = false;
      }
    },
  },
};
</script>
