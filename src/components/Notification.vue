<template>
  <div v-if="visible" class="notification bg-pink-400 text-white px-6 py-3 rounded-xl shadow-lg fixed top-8 right-8 z-50 animate-bounce">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5174')
const message = ref('')
const visible = ref(false)

onMounted(() => {
  socket.on('notify', (msg) => {
    message.value = msg
    visible.value = true
    setTimeout(() => (visible.value = false), 2000)
  })
})
</script>

<style scoped>
</style>
