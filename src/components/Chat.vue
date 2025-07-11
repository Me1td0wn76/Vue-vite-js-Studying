<template>
  <div class="chat-outer bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 rounded-3xl p-6 shadow-2xl flex flex-col items-center w-full max-w-xl mx-auto mb-8 border-4 border-pink-200">
    <h2 class="text-2xl font-bold text-pink-500 mb-4 flex items-center gap-2">
      <svg class="w-7 h-7 text-pink-400 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 0 1-4-.8l-4.28 1.07a1 1 0 0 1-1.22-1.22L3.8 16A8.96 8.96 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"/></svg>
      みんなのチャット
    </h2>
    <div class="flex w-full gap-2 mb-2">
      <input v-model="username" placeholder="名前を入力" class="flex-1 rounded-full border-2 border-pink-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white bg-opacity-90 placeholder-pink-300 text-pink-700 shadow" />
    </div>
    <div class="chat-messages bg-white bg-opacity-80 rounded-xl p-4 w-full max-h-60 overflow-y-auto mb-3 shadow-inner border border-pink-100">
      <div v-for="(msg, idx) in messages" :key="idx" class="chat-message flex items-center mb-2">
        <span class="user font-bold text-pink-500 mr-2">{{ msg.user }}:</span>
        <span class="text-gray-700">{{ msg.text }}</span>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="chat-form flex gap-2 w-full">
      <input v-model="input" placeholder="メッセージを入力..." class="flex-1 rounded-full border-2 border-pink-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white bg-opacity-90 placeholder-pink-300 text-pink-700 shadow" />
      <button type="submit" class="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-6 py-2 font-bold shadow transition-all duration-200">送信</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5174')
const messages = ref([])
const input = ref('')
const username = ref('')

onMounted(() => {
  socket.on('chat', (msg) => {
    messages.value.push(msg)
  })
})

function sendMessage() {
  if (!input.value || !username.value) return
  const msg = { user: username.value, text: input.value }
  messages.value.push(msg)
  socket.emit('chat', msg)
  input.value = ''
}
</script>

<style scoped>
</style>
