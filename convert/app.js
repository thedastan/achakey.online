const express = require('express')
const app = express()
const router = require('./router/file.route')


const PORT= 8000
app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on port ... ${PORT}`))