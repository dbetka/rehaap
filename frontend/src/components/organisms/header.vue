<template>
  <div class="o-header">
    <div
      class="m-panel f-header f-side"
      :class="{ 'f-hidden': isMainPage }"
    >
      <a-icon
        :name="ICONS.arrow_back"
        :size="28"
        @click="$router.push(pathBackButton)"
      />
    </div>
    <div class="m-panel f-header f-center">
      <template v-if="pageTitle !== ''">
        <div class="a-subtitle">
          {{ pageTitle }}
        </div>
        <div class="a-logo">
          Rehapp
        </div>
      </template>
      <div v-else class="a-logo f-big">
        Rehapp
      </div>
    </div>
    <div
      class="m-panel f-header f-side f-right"
    >
      <a-icon
        :name="ROUTES.about.icon"
        :size="28"
        class="f-header"
        @click="redirectToCollectedPointsOrScoreboard"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from 'utils/macros/routes';

export default {
  name: 'o-header',
  computed: {
    ...mapGetters('header', [
      'pageTitle',
      'backRouteName',
    ]),
    isMainPage () {
      return [
        ROUTES.welcome.name,
      ].includes(this.$route.name);
    },
    pathBackButton () {
      return ROUTES.welcome.path;
    },
  },
  methods: {
    redirectToCollectedPointsOrScoreboard () {
      this.$router.push(ROUTES.about);
    },
  },
};
</script>
