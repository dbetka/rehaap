<template>
  <t-page class="f-start">
    <div>
      <div>
        <span class="a-text f-title f-big">
          {{ $t('page.error.title') }}
        </span>
      </div>
    </div>

    <div class="m-collection f-button f-px-2">
      <div class="f-pt-3 f-text-bold" v-html="$t('page.error.content')"/>
      <div class="f-pt-1">
        <a-button-primary @click="redirectToMainPage">
          {{ $t('general.backToStart') }}
        </a-button-primary>
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonPrimary from 'atoms/button/primary';

export default {
  name: 'p-error',
  components: {
    AButtonPrimary,
    TPage,
  },
  methods: {
    redirectToMainPage () {
      const isLogin = this.$store.getters['user/isLogin'];
      const route = isLogin ? this.ROUTES.start : this.ROUTES.welcome;
      this.$router.push(route.path);
    },
  },
};
</script>
