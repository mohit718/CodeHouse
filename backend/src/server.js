import express from 'express'
import env from './libs/env.js'
import path from 'path'

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

const port = env.PORT || 3000
app.listen(port, (error) => {
    if (error)
        throw error
    console.log(`[${env.NODE_ENV}] server running on http://localhost:${port}`)
})
