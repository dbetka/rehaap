<template>
  <o-header/>
  <router-view class="f-flex-1"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OHeader from 'organisms/header.vue'

export default defineComponent({
  components: { OHeader },
})
</script>
