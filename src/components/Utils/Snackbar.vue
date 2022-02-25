<template>
  <div class="text-center ma-2">
    <v-snackbar
      :color="type"
      :v-model="snackbarInput"
      :value="show"
      @input="closeSnackBar"
    >
      {{ String(message) }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    snackbarInput: false,
  }),
  computed: {
    ...mapState("snackbars", ["message", "show", "type"]),
  },
  methods: {
    ...mapActions("snackbars", ["setSnack"]),
    closeSnackBar() {
      this.setSnack({
        message: "",
        show: false,
        type: "",
      });
    },
  },
};
</script>
