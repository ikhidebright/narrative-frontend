<template>
  <div>
    <v-app-bar color="#F0F3F4" flat fixed>
      <v-toolbar-title keep-alva>
        <img
          class="mb-n2"
          src="https://www.narrative.io/hs-fs/hubfs/narrative%20logo%20150.png?width=130&name=narrative%20logo%20150.png"
        />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <div style="width: 30%; margin-top: 20px">
        <nio-text-field
          v-model="searchText"
          label="Search orders"
          @input="querySearch()"
          small
        ></nio-text-field>
      </div> -->

      <nio-button
        type="button"
        normal-primary
        style="margin-left: 50px"
        @click="openCreateOrderModal = true"
        >Create Order</nio-button
      >
    </v-app-bar>
    <CreateEditOrderModal
      :type="'create'"
      :show="openCreateOrderModal"
      @close="openCreateOrderModal = false"
    />
  </div>
</template>

<script>
import CreateEditOrderModal from "@/components/Modals/CreateEditOrderModal";

export default {
  components: { CreateEditOrderModal },
  data() {
    return {
      openCreateOrderModal: false,
      searchText: "",
    };
  },
  methods: {
    querySearch() {},
  },
};
</script>
