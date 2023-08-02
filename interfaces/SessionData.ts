declare module 'express-session' {
    export default interface SessionData {
        accessToken?: string
        refreshToken?: string
    }
}