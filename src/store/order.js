const state = () => ({
  currentOrderItemToEdit: {},
  showEditCreateModal: false,
  showEditCreateModalType: "",
  updateOrders: false,
});

const mutations = {
  SET_ORDER_TO_EDIT(state, payload) {
    state.currentOrderItemToEdit = payload.data;
    state.showEditCreateModal = payload.show;
    state.showEditCreateModalType = payload.typeOfRequest;
  },
  SET_UPDATE_ORDERS(state, payload) {
    state.updateOrders = payload;
  },
};

const actions = {
  orderToEdit({ commit }, payload) {
    commit("SET_ORDER_TO_EDIT", payload);
  },
  setUpdateOrders({ commit }, payload) {
    commit("SET_UPDATE_ORDERS", payload);
  },
};

export default { state, mutations, actions };
