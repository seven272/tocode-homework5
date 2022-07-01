<template>
  <form @submit.prevent="onSubmit">
    <textarea v-model="text" cols="30" rows="10" required></textarea>
    <button type="submit" class="btn btnPrimary">Submit</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['onSubmit'],
  setup (_, { emit }) {
    const text = ref('')
    const onSubmit = () => {
      emit('onSubmit', text.value)
      // reset
      text.value = ''
    }

    return {
      onSubmit,
      text
    }
  }

}
</script>

<style>

</style>
