<template>
  <div class="whiteboard-container bg-pink-100 rounded-2xl shadow-lg p-4 flex flex-col items-center mb-6 border-2 border-pink-300">
    <div class="flex gap-2 mb-2">
      <label>色:
        <input type="color" v-model="color" class="rounded-full border border-pink-300 w-8 h-8 p-0" />
      </label>
      <label>太さ:
        <input type="range" min="1" max="20" v-model="lineWidth" class="w-24 align-middle" />
      </label>
      <button @click="eraser = !eraser" :class="eraser ? 'bg-pink-400 text-white' : 'bg-white text-pink-400'" class="rounded-full border border-pink-300 px-3 py-1 font-bold shadow transition">消しゴム</button>
      <label>サイズ:
        <input type="range" min="200" max="1000" v-model="canvasWidth" class="w-24 align-middle" />
        <input type="range" min="200" max="800" v-model="canvasHeight" class="w-24 align-middle" />
      </label>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="whiteboard-canvas rounded-xl border-2 border-pink-200 shadow-md bg-white"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const canvas = ref(null)
const drawing = ref(false)
const socket = io('http://localhost:5174')
const color = ref('#222')
const lineWidth = ref(3)
const eraser = ref(false)
const canvasWidth = ref(600)
const canvasHeight = ref(400)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  let last = { x: 0, y: 0 }

  const draw = (x0, y0, x1, y1, color, lineWidth, emit = true) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.closePath()
    if (emit) {
      socket.emit('draw', { x0, y0, x1, y1, color, lineWidth })
    }
  }

  canvas.value.addEventListener('mousedown', (e) => {
    drawing.value = true
    last = { x: e.offsetX, y: e.offsetY }
  })
  canvas.value.addEventListener('mousemove', (e) => {
    if (!drawing.value) return
    const drawColor = eraser.value ? '#fff' : color.value
    draw(last.x, last.y, e.offsetX, e.offsetY, drawColor, lineWidth.value)
    last = { x: e.offsetX, y: e.offsetY }
  })
  canvas.value.addEventListener('mouseup', () => {
    drawing.value = false
  })
  canvas.value.addEventListener('mouseleave', () => {
    drawing.value = false
  })

  socket.on('draw', ({ x0, y0, x1, y1, color, lineWidth }) => {
    draw(x0, y0, x1, y1, color, lineWidth, false)
  })
})
</script>

<style scoped>
.whiteboard-container {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.whiteboard-canvas {
  background: #fff;
  cursor: crosshair;
}
</style>
