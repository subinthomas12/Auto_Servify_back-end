// import express and store in a variable
const express = require("express")

// import cors
const cors = require('cors')

// import dataservice
const ds = require('./service/dataService')

// import jswt
const jwt = require('jsonwebtoken')


// app creation

const app = express()


// to convert all data from json to js
app.use(express.json())

// integrate app with frontend

app.use(cors({ origin: 'http://localhost:4200' }))

// middleware creation

const jwtMiddleware = (req, res, next) => {
    try {  // access data from request body
        const token = req.headers['access_token']

        // verify the token with secret key
        const data = jwt.verify(token, "superkey123")

        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 404
        })
    }

}



// register    - post

app.post("/register", (req, res) => {
    ds.register(req.body.cid, req.body.sname, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)

    })
})

// login
app.post("/login", (req, res) => {
    ds.login(req.body.cid, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)

    })
})

app.post("/vregister", (req, res) => {
    ds.vregister(req.body.cid, req.body.vnum, req.body.vtype, req.body.date, req.body.sq, req.body.desc).then(result => {
        res.status(result.statusCode).json(result)

    })


})
app.post("/accept", (req, res) => {
    ds.accept(req.body.cid).then(result => {
        res.status(result.statusCode).json(result)

    })


})
app.post("/reject", (req, res) => {
    ds.reject(req.body.cid).then(result => {
        res.status(result.statusCode).json(result)

    })


})
app.post("/view", (req, res) => {
    ds.view(req.body.cid).then(result => {
        res.status(result.statusCode).json(result)

    })


})


app.get("/reci", (req, res) => {

    ds.reci().then(result => {
        res.status(result.statusCode).json(result)
    })
})



// port set
app.listen(3000, () => {
    console.log("server started at port 3000")
})