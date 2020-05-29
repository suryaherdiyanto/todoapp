import Vue from 'nativescript-vue';
import App from './components/App';
import VueDevtools from 'nativescript-vue-devtools';
import Theme from "@nativescript/theme";
import store from './store';
import { mapState } from 'vuex';

Theme.setMode(Theme.Light);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('CardView', () => require('@nstudio/nativescript-cardview').CardView);

new Vue({
  store,
  data: {
    ...mapState(['isAuth'])
  },
  render: (h) => h(App)
}).$start()
