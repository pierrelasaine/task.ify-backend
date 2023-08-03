const session = require('express-session')
const ConnectRedis = require('connect-redis')

type myRedisClient = any

const RedisStore = ConnectRedis(session)

/**
 * Wrapper class for Redis store.
 */
export default class RedisStoreWrapper {
    constructor(private client: myRedisClient) {}

    /**
     * Creates an instance of RedisStore with provided client.
     * @returns An instance of RedisStore
     */
    createStore() {
        return new RedisStore({ client: this.client })
    }
}
