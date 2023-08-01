import app from './app'
import config from './utils/config'

app.listen(config.port, function () {
    console.log(`🚀 Server running on ${config.backend_base_url}:${config.port}`)
  })