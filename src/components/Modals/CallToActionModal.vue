<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="290">
      <nio-card class="p-0">
        <v-row>
          <v-card-text>
            <h3 class="mb-5">
              <slot name="title"></slot>
            </h3>
            <slot name="message"></slot>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="$emit('cancel')">
              {{ cancelText }}
            </v-btn>
            <v-btn color="green darken-1" text @click="$emit('ok')">
              <v-progress-circular
                v-if="loading"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-else> {{ okText }} </span>
            </v-btn>
          </v-card-actions>
        </v-row>
      </nio-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    okText: {
      type: String,
      default: "Continue",
    },
  },
};
</script>
