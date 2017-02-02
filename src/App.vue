<template>
  <div>
    <div class="page-group">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SidePanel from './components/SidePanel.vue'

  export default {
    name: 'app',
    components: {
      SidePanel
    }
  }
</script>

