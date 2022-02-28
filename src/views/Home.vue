<template>
  <div class="mt-10 pt-16">
    <CallToActionModal
      :loading="deleteLoading"
      :show="showDelete"
      @ok="deleteOrderItem"
      @cancel="showDelete = false"
    >
      <template #title>Delete Order "{{ itemToDelete.name }}"</template>
      <template #message>
        Are you sure you want to delete this? You will loose order data.
      </template>
    </CallToActionModal>
    <v-row v-if="loadingOrders">
      <v-col v-for="n in 4" :key="n" cols="12" sm="4">
        <v-skeleton-loader
          class="mb-5"
          v-bind="skeletonLoaderSttrs"
          type="list-item-three-line, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <div v-else>
      <div
        v-if="orders.length < 1 || errorFetchingOrders"
        class="text-center no-orders"
      >
        <span v-if="errorFetchingOrders"
          >An error occurred, check your internet connection and
          <span @click="fetchOrders()" class="blue--text cursor"> retry </span>
        </span>
        <span v-else
          >You currently have not created any order,
          <span @click="addOrder" class="blue--text cursor">
            add some now!
          </span>
        </span>
      </div>
      <v-row v-else>
        <v-col v-for="order in orders" :key="order.id" cols="12" sm="4">
          <OrderItemCard
            :id="order.id"
            :name="order.name"
            :max_bid_price="order.max_bid_price"
            :data_package_type="order.data_package_type"
            @on-item-delete="openDeleteModal"
            @on-item-edit="openEditModal"
          />
        </v-col>
      </v-row>
      <div class="text-center mt-6">
        <v-btn
          v-if="currentPage < totalPages"
          type="submit"
          color="green darken-1"
          text
          @click="loadMoreOrderItems()"
        >
          <v-progress-circular
            v-if="loadingMore"
            indeterminate
            size="20"
          ></v-progress-circular>
          <span v-else> Load more </span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import miscMixin from "@/mixins/misc";
import { mapState, mapActions } from "vuex";
import OrderItemCard from "@/components/Cards/OrderItemCard";
const CallToActionModal = () => import("@/components/Modals/CallToActionModal");
import { baseOrderUrl } from "@/services/resource/order";

export default {
  name: "Home",
  mixins: [miscMixin],
  data: () => ({
    nextPage: 1,
    currentPage: null,
    totalPages: null,
    errorFetchingOrders: false,
    deleteLoading: false,
    skeletonLoaderSttrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
    loadingOrders: false,
    orders: [],
    itemToDelete: {},
    showDelete: false,
    loadingMore: false,
  }),
  components: { OrderItemCard, CallToActionModal },
  async created() {
    await this.fetchOrders();
  },
  computed: {
    ...mapState("orders", [
      "updateOrders",
      "orderEdited",
      "editedOrderNewDetails",
    ]),
  },
  watch: {
    // check if an order has been edited and change the order item in the order array with new edited values
    orderEdited(v) {
      if (v) {
        const indexOfEditedOrder = this.orders.findIndex((item) => {
          return item.id === this.editedOrderNewDetails.id;
        });
        this.orders.splice(indexOfEditedOrder, 1, this.editedOrderNewDetails);
        this.setSuccessfulEditedOrder({
          data: {},
          edit: false,
        });
      }
    },
    // fetch new orders when updateOrders is true
    async updateOrders(v) {
      if (v) {
        await this.fetchOrders();
        this.setUpdateOrders(false);
      }
    },
  },
  methods: {
    ...mapActions("orders", [
      "setUpdateOrders",
      "setSuccessfulEditedOrder",
      "orderToEdit",
    ]),
    async loadMoreOrderItems() {
      this.loadingMore = true;
      try {
        const { data } = await this.$http.get(
          `${baseOrderUrl}?limit=${this.orders.length + 10}`
        );
        this.orders = data.data;
        this.currentPage = data.currentPage;
        this.totalPages = data.numberOfPages;
        this.nextPage = data.nextPage;
        this.loadingMore = false;
      } catch (error) {
        this.loadingMore = false;
      }
    },
    async fetchOrders() {
      try {
        this.errorFetchingOrders = false;
        this.loadingOrders = true;
        const { data } = await this.$http.get(baseOrderUrl);
        this.orders = data.data;
        this.currentPage = data.currentPage;
        this.totalPages = data.numberOfPages;
        this.nextPage = data.nextPage;
        this.loadingOrders = false;
      } catch (error) {
        this.loadingOrders = false;
        this.errorFetchingOrders = true;
      }
    },
    // dispatch action to open modal to add a new order (NOTE: typeOfRequest = "create")
    addOrder() {
      this.orderToEdit({
        data: {},
        show: true,
        typeOfRequest: "create",
      });
    },
    // dispatch action to open modal to edit an order (NOTE: typeOfRequest = "update")
    openEditModal(e) {
      this.orderToEdit({
        data: e,
        show: true,
        typeOfRequest: "update",
      });
    },
    // open the delete modal setting the itemToDelete to the emitted data from our custom event
    openDeleteModal(e) {
      this.itemToDelete = e;
      this.showDelete = true;
    },
    async deleteOrderItem() {
      this.deleteLoading = true;
      try {
        await this.$http.delete(`${baseOrderUrl}/${this.itemToDelete.id}`);
        const indexOfOrderItem = this.orders.findIndex((item) => {
          return item.id === this.itemToDelete.id;
        });
        this.orders.splice(indexOfOrderItem, 1);
        this.showDelete = false;
        this.itemToDelete = {};
        this.deleteLoading = false;
        if (this.nextPage) {
          const { data } = await this.$http.get(
            `${baseOrderUrl}?limit=${this.orders.length + 1}`
          );
          this.orders = data.data;
          this.currentPage = data.currentPage;
          this.totalPages = data.numberOfPages;
          this.nextPage = data.nextPage;
          this.showSnack("Order deleted successfully", "success");
        }
      } catch (error) {
        this.deleteLoading = false;
        //
      }
    },
  },
};
</script>

<style scoped>
/* .home {
  margin-top: 15vh;
} */
.no-orders {
  margin-top: 35vh;
}
.cursor {
  cursor: pointer;
}
</style>
