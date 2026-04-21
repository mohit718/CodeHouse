import { StreamChat } from 'stream-chat'
import env from './env.js'

const apiKey = env.STREAM_API_KEY
const apiSecret = env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET missing!")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData)
        return userData
    } catch (error) {
        console.error("Error upserting stream user:", error);
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId)
        console.log(`Stream user deleted successfully: ${userId}`)
    } catch (error) {
        console.error("Error deleting stream user:", error);
    }
}

// TODO: Add method to generate user tokens for client-side authentication when needed.
