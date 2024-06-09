<script>

import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
export default {
  name: "app-actionToolbar",
  setup() {
    const router = useRouter();

    const items = computed(() => {
      return [
        {
          label: 'Dieta',
          icon: 'pi pi-apple',
          path: `/pet/${router.currentRoute.value.params.id}/diet`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/diet`);
          }
        },
        {
          label: 'Citas',
          icon: 'pi pi-calendar',
          path: `/pet/${router.currentRoute.value.params.id}/appointments`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/appointments`);
          }
        },
        {
          label: 'Tratamientos',
          icon: 'pi pi-heart-fill',
          path: `/pet/${router.currentRoute.value.params.id}/treatments`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/treatments`);
          }
        },
        {
          label: 'Historial Médico',
          icon: 'pi pi-list-check',
          path: `/pet/${router.currentRoute.value.params.id}/medical-history/appointments`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/medical-history/appointments`);
          }
        }
      ]
    });

    return {items};
  }
}

</script>
<template>
  <div class="card">
    <pv-tabMenu :model="items"/>

  </div>
</template>

<style>
@media (max-width: 768px) {
  .card {
    width: 100%;
  }

  .p-tabmenu {
    font-size: 0.8rem;
  }
}

</style>
