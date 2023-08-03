import axios from 'axios'
import { createClient } from 'redis'

import config from '../../utils/config'
import createOAuthRoute from './oauthRouteFactory'
import RedisStoreWrapper from './redisStoreWrapper'
import utils from '../../utils/utils'
import { User } from '../../models/user'

import OAuthVariables from '../../interfaces/oAuthVariables'

const redisClient = createClient({
    password: 'eshp8Cp8V1ZuZtblSycEZM0bXvFexEQD',
    socket: {
        host: 'redis-13909.c284.us-east1-2.gce.cloud.redislabs.com',
        port: 13909
    }
})

const redisStoreWrapper = new RedisStoreWrapper(redisClient)

const variables: OAuthVariables = {
    client_id: config.client_id!,
    client_secret: config.client_secret!,
    frontend_base_url: config.frontend_base_url!,
    backend_base_url: config.backend_base_url!
}

const oAuthRoute = createOAuthRoute(
    utils,
    axios,
    User,
    redisStoreWrapper,
    variables
)

export default oAuthRoute
