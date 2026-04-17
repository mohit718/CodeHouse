import express from 'express'
import env from './libs/env.js'

const app = express()

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is up & running.', status: 200 });
})

const port = env.PORT || 3000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
