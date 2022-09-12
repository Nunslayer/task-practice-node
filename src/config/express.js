const express = require('express')
const { tasksRouter } = require('../routes/task.routes')
const { usersRouter } = require('../routes/user.routes')

const app = express()
//Static midlewares
app.use(express.json())
app.use(express.text())

//Routes

//User routes
app.use('/api/v1/users', usersRouter)

//Task routes
app.use('/api/v1/tasks', tasksRouter)

//Error handler
app.all('*', (req, res)=>{
    res.status(404).json({
        status: 'not found',
        message: 'We dont have support, to that url services'
    })
})
module.exports = {app}