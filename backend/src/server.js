import express from 'express'
import env from './libs/env.js'
import path from 'path'
import { connectDB } from './libs/db.js'

const app = express()

const __project_root = path.join(path.resolve(), '../')

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is up & running.', status: 200 });
})

if (env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__project_root, 'frontend', 'dist')))

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__project_root, 'frontend', 'dist', 'index.html'));
    })
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log(`✅[${env.NODE_ENV}] server running on http://localhost:${env.PORT}`)
        })
    } catch (error) {
        console.error('❌Failed to start the server.', error);
    }

}

startServer();

