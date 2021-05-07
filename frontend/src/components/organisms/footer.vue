<template>
  <div
    class="o-footer"
  >
    o-footer
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'o-footer',
  methods: {
    ...mapMutations('menu', [
      'toggle',
    ]),
    isActualPath ({ path = '' }) {
      if (this.$store.getters['menu/isOpen']) {
        return path === '';
      } else {
        return this.$route.path === path;
      }
    },
  },
};
</script>
