const express = require('express')
const path = require('path')

const PORT = 3000

const app = new express()

app.get('/', (req, res) => {
    console.log('get na /')

    res.sendFile(path.resolve('static', 'git-info.html'))
})

app.listen(PORT, () => {
    console.log('start server 127.0.0.1 localhost')
    console.log(`http://127.0.0.1:${PORT}`)
})