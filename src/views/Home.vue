<template>
  <div class="home">
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
      <div v-if="orders.length < 1" class="text-center no-orders">
        <span
          >You currently have not created any order,
          <span @click="addOrder" class="blue--text cursor">
            add some now!
          </span>
        </span>
      </div>
      <v-row v-else>
        <v-col v-for="order in orders" :key="`oi${order.id}`" cols="12" sm="4">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import OrderItemCard from "@/components/Cards/OrderItemCard";
import CallToActionModal from "@/components/Modals/CallToActionModal";
import { baseOrderUrl } from "@/services/resource/order";

export default {
  name: "Home",
  data() {
    return {
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
    };
  },
  components: { OrderItemCard, CallToActionModal },
  async created() {
    await this.fetchOrders();
  },
  computed: {
    ...mapState("orders", ["updateOrders"]),
  },
  watch: {
    async updateOrders(v) {
      if (v) {
        await this.fetchOrders();
        this.setUpdateOrders(false);
      }
    },
  },
  methods: {
    ...mapActions("orders", ["setUpdateOrders", "orderToEdit"]),
    async fetchOrders() {
      try {
        this.loadingOrders = true;
        const { data } = await this.$http.get(baseOrderUrl);
        this.orders = data.data;
        this.loadingOrders = false;
      } catch (error) {
        this.loadingOrders = false;
        //
      }
    },
    addOrder() {
      this.orderToEdit({
        data: {},
        show: true,
        typeOfRequest: "create",
      });
    },
    openEditModal(e) {
      this.orderToEdit({
        data: e,
        show: true,
        typeOfRequest: "update",
      });
    },
    openDeleteModal(e) {
      this.itemToDelete = e;
      this.showDelete = true;
    },
    async deleteOrderItem() {
      this.deleteLoading = true;
      try {
        await this.$http.delete(`${baseOrderUrl}/${this.itemToDelete.id}`);
        await this.fetchOrders();
        this.showDelete = false;
        this.itemToDelete = {};
        this.deleteLoading = false;
      } catch (error) {
        this.deleteLoading = false;
        //
      }
    },
  },
};
</script>

<style scoped>
.home {
  margin-top: 15vh;
}
.no-orders {
  margin-top: 35vh;
}
.cursor {
  cursor: pointer;
}
</style>
