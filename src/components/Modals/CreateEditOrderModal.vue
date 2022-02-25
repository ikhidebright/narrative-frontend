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
                  type="number"
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
              <v-progress-circular
                v-if="createEditLoading"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-else> Save </span>
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
    createEditLoading: false,
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
    ...mapState("orders", [
      "showEditCreateModalType",
      "showEditCreateModal",
      "currentOrderItemToEdit",
    ]),
  },
  watch: {
    showEditCreateModal(v) {
      if (v && this.showEditCreateModalType === "update") {
        Object.entries(this.currentOrderItemToEdit).forEach(([key, val]) => {
          if (key !== "id") this.$set(this.formOrderData, key, val);
        });
      }
    },
  },
  methods: {
    ...mapActions("orders", ["setUpdateOrders", "orderToEdit"]),
    closeModal() {
      this.formOrderData.name = "";
      this.formOrderData.data_package_type = "";
      this.formOrderData.max_bid_price = "";
      this.orderToEdit({
        data: {},
        show: false,
        typeOfRequest: "",
      });
    },
    async handleOkayButton() {
      this.createEditLoading = true;
      try {
        this.formOrderData.max_bid_price = String(
          this.formOrderData.max_bid_price
        );
        if (this.showEditCreateModalType === "create") {
          await this.$http.post(baseOrderUrl, this.formOrderData);
        } else if (this.showEditCreateModalType === "update") {
          await this.$http.put(
            `${baseOrderUrl}/${this.currentOrderItemToEdit.id}`,
            this.formOrderData
          );
        }
        this.createEditLoading = false;
        this.setUpdateOrders(true);
        this.closeModal();
      } catch (error) {
        this.createEditLoading = false;
        //
      }
    },
  },
};
</script>
