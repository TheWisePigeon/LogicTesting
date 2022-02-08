const express = require('express')
const bodyparser = require('body-parser')
let constants = require('./const')
const app = express()
app.use(bodyparser.urlencoded({ extended : true}))

const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/home.html")
    console.log(`Total supply remaining is ${constants.totalSupply}`);
})

app.get('/index', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res)=>{
    let result = req.body
    let user = {
        "nom" : result.name,
        "email" : result.mail,
        "password" : result.pwd,
        "balance" : 2000,
        "ref" : ``
    }
    constants.totalSupply-=2000
    constants.users.unshift(user)
    res.send(`Post received <br/>You have ${constants.users.length} users registred<br/>`)
})



app.listen(port, ()=>{
    console.log("App listening on port " + port);
})