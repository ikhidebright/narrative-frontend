<template>
  <nio-card>
    <h4 class="text-truncate">{{ capitalizeText(name) }}</h4>
    <small class="mb-n1 d-block"
      >${{ Number(max_bid_price).toLocaleString() }}</small
    >
    <small>{{ data_package_type }}</small>
    <div class="mt-3 d-flex justify-end">
      <nio-button x-small variant="secondary" @click="editItem()"
        >Edit</nio-button
      >
      <nio-button x-small variant="error" class="ml-3" @click="deleteItem()"
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
      validator(value) {
        return ["Device Location", "Device Behavior", "ID Mapping"].includes(
          value
        );
      },
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
