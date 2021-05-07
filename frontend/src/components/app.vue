<template>
  <div id="app">
    <o-header/>
    <div class="f-relative f-flex-1">
      <router-view :key="routerId"/>
    </div>
    <o-footer
      v-touch:swipe.left="openMenuIfLogin"
      v-touch:swipe.right="closeMenu"
    />
    <o-menu/>
    <div
      class="a-cover f-menu"
      :class="isOpen ? 'f-show' : ''"
      @click="closeMenu"
      v-touch:swipe.right="closeMenu"
    />
    <m-snackbar/>
    <transition name="fade">
      <o-loading v-show="isLoading"/>
    </transition>
  </div>
</template>

<script>
import OHeader from 'organisms/header';
import OMenu from 'organisms/menu';
import OFooter from 'organisms/footer';
import OLoading from 'organisms/loading';
import { mapGetters, mapMutations } from 'vuex';
import MSnackbar from 'molecules/snackbar';

export default {
  components: {
    MSnackbar,
    OHeader,
    OMenu,
    OFooter,
    OLoading,
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'routerId',
    ]),
    ...mapGetters('menu', [
      'isOpen',
    ]),
  },
  methods: {
    ...mapMutations('menu', {
      openMenu: 'open',
      closeMenu: 'close',
    }),
    openMenuIfLogin () {
      /* this.$store.getters['user/isLogin'] && */this.openMenu();
    },
  },
};
</script>
