export default {
  state: {
    message: 'Hello vuex',
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    setMessage({ commit }, payload) {
      commit('setMessage', payload);
    },
  },
  getters: {
    getUsers(state) {
      return state.message;
    },
  },
};
