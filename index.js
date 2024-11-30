import express from 'express'

const app = express()
import apirouter from './router/api.js'

app.use('/api', apirouter)
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen('8080', () => {
    console.log(`Online!`)
})

export default app