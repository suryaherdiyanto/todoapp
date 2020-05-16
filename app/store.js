import Vue from 'vue';
import Vuex from 'vuex';
import state from './vuex/states';
import mutations from './vuex/mutations';
import actions from './vuex/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions
});
