<template>
  <div class="home">
    <CallToActionModal
      :show="showDelete"
      @ok="deleteOrderItem"
      @cancel="showDelete = false"
    >
      <template #title>Delete Order "{{ itemToDelete.name }}"</template>
      <template #message>
        Are you sure you want to delete this? You will loose order data.
      </template>
    </CallToActionModal>
    <v-row>
      <v-col v-for="order in orders" :key="order.id" cols="4">
        <OrderItemCard
          :id="order.id"
          :name="order.name"
          :max_bid_price="order.max_bid_price"
          :data_package_type="order.data_package_type"
          @on-item-delete="openDeleteModal"
          @on-item-edit="openEditModal()"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OrderItemCard from "@/components/Cards/OrderItemCard";
import CallToActionModal from "@/components/Modals/CallToActionModal";
import { baseOrderUrl } from "@/services/resource/order";

export default {
  name: "Home",
  data() {
    return {
      orders: [],
      itemToDelete: {},
      showDelete: false,
    };
  },
  components: { OrderItemCard, CallToActionModal },
  async created() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const { data } = await this.$http.get(baseOrderUrl);
        this.orders = data.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    openEditModal(e) {
      console.log(e);
    },
    openDeleteModal(e) {
      this.itemToDelete = e;
      this.showDelete = true;
    },
    async deleteOrderItem() {
      try {
        await this.$http.delete(`${baseOrderUrl}/${this.itemToDelete.id}`);
        await this.fetchOrders();
        this.showDelete = false;
        this.itemToDelete = {};
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  margin-top: 15vh;
}
</style>
