<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Whiteboard from './components/Whiteboard.vue'
import Chat from './components/Chat.vue'
import Notification from './components/Notification.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center py-8">
    <h1 class="text-4xl font-extrabold text-pink-500 mb-2 drop-shadow">リアルタイムホワイトボード & チャット</h1>
    <p class="mb-6 text-pink-400 font-semibold">みんなでお絵描き＆おしゃべりしよう！</p>
    <Whiteboard />
    <Chat />
    <Notification />
  </div>
</template>

<style scoped>
</style>
