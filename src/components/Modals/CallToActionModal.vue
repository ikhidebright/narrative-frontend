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
            <v-btn color="green darken-1" text @click="$emit('cancel')">
              {{ cancelText }}
            </v-btn>
            <v-btn color="green darken-1" text @click="$emit('ok')">
              {{ okText }}
            </v-btn>
          </v-card-actions>
        </v-row>
      </nio-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
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
