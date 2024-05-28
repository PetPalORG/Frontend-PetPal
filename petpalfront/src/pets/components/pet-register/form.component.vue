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
    <label :for="'input'" class="label" v-if="!modelValue">
      {{ title }}
    </label>
  </div>
</template>


<style scoped>
.float-label {
  position: relative;
  display: block;
  margin-bottom: 50px;
}

.input-text {
  transform: scale(1.5);
  width: 40%;
  height: 1.5vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: #D9D9D9;
  margin-left: 50px;
}

.input-text:focus {
  border-color: #007BFF;
}

.label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-220%) translateX(-10%);
  pointer-events: none;
  transition: all 0.2s;
  padding: 0 5px;
  font-size: 1.5rem;
  color: black;
}

.label.active {
  top: -10px;
  left: 15px;
  font-size: 0.8rem;
  color: #007BFF;
}

.label.hidden {
  display: none; /* Oculta el label cuando tiene la clase 'hidden' */
}
</style>