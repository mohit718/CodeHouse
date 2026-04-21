import { chatClient } from "../libs/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = chatClient.createToken(req.user.clerkId)
        
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
        })

    } catch (error) {
        console.error('Error in getStreamToken in chatController', error);
        res.status(501).json({ error: 'Internal Server Error' })
    }
}