<script>
export default {
  props: {
    title: {
      required: "True",
      type: String,
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleFocus(isFocused) {
      this.isActive = isFocused || this.modelValue !== '';
    },
  },
};
</script>

<template>
  <div class="float-label">
    <input
        type="text"
        id="input"
        :value="modelValue"
        @input="updateValue"
        @focus="handleFocus(true)"
        @blur="handleFocus(false)"
        placeholder=" "
        class="input-text"
    />
    <!-- Mostrar el label solo si value está vacío -->
    <label :for="'input'" class="label" v-if="!modelValue">
      {{ title }}
    </label>
  </div>
</template>


<style scoped>
.float-label {
  position: relative;
  display: block;
  margin-top: 70px;
  margin-left: 40px;
}

.input-text {
  width: 80%;
  height: 30vh;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: #D9D9D9;
  padding: 10px;
}

.input-text:focus {
  border-color: #007BFF;
}

.label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-500%) translateX(-10%);
  pointer-events: none;
  transition: all 0.2s;
  padding: 0 5px;
  font-size: 2rem;
  color: black;
}
</style>