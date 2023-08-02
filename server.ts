import app from './app'
import config from './utils/config'

app.listen(config.port, function () {
    console.log(`🚀 Server running on ${config.port}`)
  })