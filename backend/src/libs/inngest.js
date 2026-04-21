import { Inngest } from "inngest";
import { connectDB } from './db.js';
import User from "../models/User.js";

export const client = new Inngest({ id: "CodeHouse", });

const syncUserCreated = client.createFunction(
    { id: "sync-user-created", triggers: [{ event: "clerk/user.created" }] },
    async ({ event }) => {
        await connectDB();
        
        const data = event.data;

        await User.findOneAndUpdate(
            { clerkId: data.id },
            {
                clerkId: data.id,
                email: data.email,
                name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                profileImage: data.imageUrl,
            },
            { upsert: true, new: true }
        );

        return { success: true };
    }
);

export const functions = [syncUserCreated]