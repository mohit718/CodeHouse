import express from 'express'
import { createSession, getActiveSessions, getPastSessions, getSession, joinSession, endSession } from '../controllers/sessionController.js'
import { protectRoute } from '../middlewares/protectRoute.js'

const router  = express.Router()

// /api/session
router.post('/', protectRoute, createSession)
router.get('/active', protectRoute, getActiveSessions)
router.get('/past', protectRoute, getPastSessions)
router.get('/:id', protectRoute, getSession)
router.post('/:id', protectRoute, joinSession)
router.delete('/:id', protectRoute, endSession)


export default router