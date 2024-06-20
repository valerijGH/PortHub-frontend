import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    loadUser({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
    },
    saveUser({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('clearUser');
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
