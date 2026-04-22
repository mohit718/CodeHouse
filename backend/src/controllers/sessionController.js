import Session from "../models/Session.js"
import { chatClient, streamClient } from "../libs/stream.js"

export async function createSession(req, res) {
    try {
        const problemId = req.body.problemId
        const userId = req.user._id
        const clerkId = req.user.clerkId

        const problem = await Problem.findById(problemId)
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' })
        }

        const callId = `call_${Date.now()}_${userId}`

        const session = await Session.create({ problem: problemId, host: userId, callId })

        await streamClient.video.call('default', callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                session_id: session._id.toString(),
            }
        })

        chatClient.channel('messaging', callId, {
            name: `Chat for session ${session._id}`,
            created_by_id: clerkId,
            members: [clerkId],
        })

        res.status(200).json({ session })

    } catch (error) {
        console.error("Error creating session", error)
        res.status(500).json({ error: 'Failed to create session' })
    }
}

export async function getActiveSessions(req, res) {
    try {
        const session = await Session.find({ status: 'active' })
            .populate('problem')
            .populate('host')
            .populate('participant')
            .sort({ createdAt: -1 })
            .limit(20)

        res.status(200).json({ session })

    } catch (error) {
        console.error("Error fetching active sessions", error)
        res.status(500).json({ error: 'Failed to fetch active sessions' })
    }
}

export async function getPastSessions(req, res) {
    try {
        const userId = req.user._id
        const session = await Session.find({ status: 'completed', $or: [{ host: userId }, { participant: userId }] })
            .populate('problem')
            .sort({ createdAt: -1 })
            .limit(20)

        res.status(200).json({ session })

    } catch (error) {
        console.error("Error fetching past sessions", error)
        res.status(500).json({ error: 'Failed to fetch past sessions' })
    }
}

export async function getSession(req, res) {
    const sessionId = req.params.id
    try {
        const session = await Session.findById(sessionId)
            .populate('problem')
            .populate('host')
            .populate('participant')

        if (!session) {
            return res.status(404).json({ error: 'Session not found' })
        }

        res.status(200).json({ session })
    } catch (error) {
        console.error("Error fetching session", error)
        res.status(500).json({ error: 'Failed to fetch session' })
    }

}

export async function joinSession(req, res) {
    const sessionId = req.params.id
    const userId = req.user._id
    const clerkId = req.user.clerkId
    try {
        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Session not found' })
        }

        if(session.participant) {
            return res.status(400).json({ error: 'Session is already full' })
        }

        session.participant = userId
        await session.save()

        await chatClient.channel('messaging', session.callId).addMembers([clerkId])

        res.status(200).json({ session })
    } catch (error) {
        console.error("Error joining session", error)
        res.status(500).json({ error: 'Failed to join session' })
    }

}

export async function endSession(req, res) { 
    const sessionId = req.params.id
    try {
        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Session not found' })
        }

        if(userId.toString() !== session.host.toString()) {
            return res.status(403).json({ error: 'Only the host can end the session' })
        }

        if(session.status === 'completed') {
            return res.status(400).json({ error: 'Session is already completed' })
        }

        streamClient.video.call('default', session.callId).delete({hard: true})
        chatClient.channel('messaging', session.callId).delete()

        session.callId = ''
        session.status = 'completed'
        
        await session.save()

        res.status(200).json({ session, message: 'Session ended successfully' })

    } catch (error) {
        console.error("Error ending session", error)
        res.status(500).json({ error: 'Failed to end session' })
    }
}
