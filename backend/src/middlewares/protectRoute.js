import { getAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute = [
    async (req, res, next) => {
        try {
            const { clerkId } = getAuth(req);
            if (!clerkId) {
                // return res.redirect('/');
                return res.status(401).json({ error: 'UserNotAuthenticated' });
            }

            const user = User.findOne({ clerkId })
            if (!user) {
                // return res.redirect('/');
                // return res.status(404).json({ error: 'UserNotFound' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware", error);
            // return res.redirect('/');
            // res.status(501).json({ error: 'Internal Server Error' })
        }
    }
]