<script>
import ToolbarComponent from "@/public/components/toolbar.component.vue";
export default {
  name: 'App',
  components: {ToolbarComponent},
}

</script>

<template>
  <toolbar-component v-if="$route.name !== 'login' && $route.name !== 'register' && $route.name !== 'landing'"></toolbar-component>
  <router-view/>
</template>
