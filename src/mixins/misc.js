export default {
  methods: {
    showSnack(message, type) {
      if (!["error", "success"].includes(type)) {
        console.error("snackbar type must be one of 'error', 'success'");
      } else {
        type = type === "error" ? "red" : "success";
        this.$store.dispatch("snackbars/setSnack", {
          message: message,
          show: true,
          type: type,
        });
      }
    },
  },
};
