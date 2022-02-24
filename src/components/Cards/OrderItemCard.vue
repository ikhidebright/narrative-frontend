<template>
  <nio-card>
    <h4>{{ capitalizeText(name) }}</h4>
    <p>${{ Number(max_bid_price).toLocaleString() }}</p>
    <small>{{ data_package_type }}</small>
    <div class="action">
      <nio-button
        x-small
        variant="secondary"
        class="action-btn"
        @click="editItem()"
        >Edit</nio-button
      >
      <nio-button
        x-small
        variant="error"
        class="action-btn"
        @click="deleteItem()"
        >Delete</nio-button
      >
    </div>
  </nio-card>
</template>

<script>
import utilityMixin from "@/mixins/utility";

export default {
  mixins: [utilityMixin],
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    max_bid_price: {
      type: String,
      required: true,
    },
    data_package_type: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.$emit("on-item-delete", { id: this.id, name: this.name });
    },
    editItem() {
      this.$emit("on-item-edit", {
        id: this.id,
        name: this.name,
        max_bid_price: this.max_bid_price,
        data_package_type: this.data_package_type,
      });
    },
  },
};
</script>

<style scoped>
.action {
  display: flex;
  justify-content: end;
}
.action > .action-btn {
  margin-left: 6px;
}
</style>
