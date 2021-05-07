import Vue from 'vue';
import i18n from './dictionary';
import router from './router';
import { store } from 'store';
import { styleManager } from 'utils/style-manager';
import './directives';
import './validation';
import { ROUTES } from 'utils/macros/routes';
import App from './components/app.vue';
import VueEllipseProgress from 'vue-ellipse-progress';
import Vue2TouchEvents from 'vue2-touch-events';
import VueMaterialIcons from '@dbetka/vue-material-icons';

styleManager.init();

Vue.config.productionTip = false;

if (PRODUCTION === false) {
  console.log(APP_NAME + ' v' + VERSION + ' in development mode');
}

Vue.mixin({
  computed: {
    ROUTES: () => ROUTES,
  },
});

Vue.use(Vue2TouchEvents);
Vue.use(VueEllipseProgress);
Vue.use(VueMaterialIcons);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
