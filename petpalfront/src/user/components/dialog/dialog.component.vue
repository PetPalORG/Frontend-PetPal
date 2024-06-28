<!-- DialogComponent.vue -->
<template>
    <div v-if="isVisible" class="dialog-background">
      <div class="dialog">
        <p>{{ message }}</p>
        <Button @click="close">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
import Button from 'primevue/button';

  export default {
    props: ['isVisible', 'message'],
    emits: ['close'],
    components: {
        Button
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style>
  .dialog-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  </style>