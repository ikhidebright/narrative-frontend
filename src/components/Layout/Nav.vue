<template>
  <div>
    <v-app-bar color="#F0F3F4" flat fixed>
      <v-toolbar-title>
        <v-img
          src="https://www.narrative.io/hs-fs/hubfs/narrative%20logo%20150.png?width=130&name=narrative%20logo%20150.png"
        />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <nio-button type="button" normal-primary @click="openCreateModal()"
        >Create Order</nio-button
      >
    </v-app-bar>
    <Snackbar />
    <CreateEditOrderModal />
  </div>
</template>

<script>
import { mapActions } from "vuex";
const CreateEditOrderModal = () =>
  import("@/components/Modals/CreateEditOrderModal");
const Snackbar = () => import("@/components/Utils/Snackbar");

export default {
  components: { CreateEditOrderModal, Snackbar },
  data() {
    return {};
  },
  methods: {
    ...mapActions("orders", ["orderToEdit"]),
    openCreateModal() {
      this.orderToEdit({
        data: {},
        show: true,
        typeOfRequest: "create",
      });
    },
  },
};
</script>
