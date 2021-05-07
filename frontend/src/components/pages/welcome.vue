<template>
  <t-page title="">
    <div class="a-img f-map-round"/>
    <div class="m-collection f-button">
      <a-button-primary @click="$router.push(ROUTES.welcome.path)">
        {{ ROUTES.welcome.label }}
      </a-button-primary>
      <a-button-secondary @click="$router.push(ROUTES.about.path)">
        {{ ROUTES.about.label }}
      </a-button-secondary>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonPrimary from 'atoms/button/primary';
import AButtonSecondary from 'atoms/button/secondary';

export default {
  name: 'p-welcome',
  components: {
    AButtonSecondary,
    AButtonPrimary,
    TPage,
  },
};
</script>
