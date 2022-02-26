const state = () => ({
  editedOrderNewDetails: {},
  orderEdited: false,
  currentOrderItemToEdit: {},
  showEditCreateModal: false,
  showEditCreateModalType: "",
  updateOrders: false,
});

const mutations = {
  SET_ORDER_TO_EDIT(state, payload) {
    state.showEditCreateModal = payload.show;
    state.currentOrderItemToEdit = payload.data;
    state.showEditCreateModalType = payload.typeOfRequest;
  },
  SET_UPDATE_ORDERS(state, payload) {
    state.updateOrders = payload;
  },
  SET_EDITED_ORDER(state, payload) {
    state.editedOrderNewDetails = payload.data;
    state.orderEdited = payload.edit;
  },
};

const actions = {
  orderToEdit({ commit }, payload) {
    commit("SET_ORDER_TO_EDIT", payload);
  },
  setUpdateOrders({ commit }, payload) {
    commit("SET_UPDATE_ORDERS", payload);
  },
  setSuccessfulEditedOrder({ commit }, payload) {
    commit("SET_EDITED_ORDER", payload);
  },
};

export default { state, mutations, actions };
