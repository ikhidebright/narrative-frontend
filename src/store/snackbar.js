const state = () => ({
  message: "",
  type: "",
  show: false,
});

const mutations = {
  SET_SNACK(state, payload) {
    state.message = payload.message;
    state.type = payload.type;
    state.show = payload.show;
  },
};

const actions = {
  setSnack({ commit }, payload) {
    commit("SET_SNACK", payload);
  },
};

export default { state, mutations, actions };
