import { Server } from 'socket.io'
import http from 'http'

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  // ホワイトボード描画イベント
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data)
  })

  // チャットイベント
  socket.on('chat', (msg) => {
    io.emit('chat', msg)
    io.emit('notify', `${msg.user} さんから新しいメッセージ: ${msg.text}`)
  })
})

const PORT = 5174
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
