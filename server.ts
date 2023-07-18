import app from './app'
import SERVER_PORT from './utils/config'

app.listen(SERVER_PORT, function () {
    console.log(`🚀 Server running on http://localhost:${SERVER_PORT}`)
  })