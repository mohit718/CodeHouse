import { Inngest } from "inngest";
import { connectDB } from './db.js';
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const client = new Inngest({ id: "CodeHouse", });

const syncUserCreated = client.createFunction(
    { id: "sync-user-created", triggers: [{ event: "clerk/user.created" }] },
    async ({ event }) => {
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const userData = {
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            profileImage: image_url || null,
        }

        await User.findOneAndUpdate(
            { clerkId: id },
            userData,
            { upsert: true, returnDocument: "after" }
        );

        await upsertStreamUser({
            id: userData.clerkId.toString(),
            name: userData.name,
            image:userData.profileImage
        })

        return { success: true };
    }
);

const syncUserDeleted = client.createFunction(
    { id: "sync-user-deleted", triggers: [{ event: "clerk/user.deleted" }] },
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;

        await User.deleteOne({ clerkId: id });

        await deleteStreamUser(id.toString());

        return { success: true };
    }
);

export const functions = [syncUserCreated, syncUserDeleted]