const express = require('express')
const bodyparser = require('body-parser')
const crypto = require('crypto')
let constants = require('./const')
const app = express()
app.use(bodyparser.urlencoded({ extended : true}))

const port = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/home.html")
})
.post('/', (req, res)=>{
    let result = req.body
    let hash = crypto.createHmac('sha256', result.name).digest('hex')
    console.log(hash);
    let user = {
        "name" : result.name,
        "email" : result.mail,
        "password" : result.pwd,
        "balance" : 2000,
        "ref" : `${hash}`
    }
    constants.totalSupply-=2000
    if (result.ref) {
        console.log(`User refeered by ${result.ref}`);
        constants.users.forEach(element => {
            if(element.name==result.ref){
                element.balance+=500
                constants.totalSupply-=500
            }
        });
    }
    console.log(constants.totalSupply);
    constants.users.unshift(user)
    res.send(`Post received <br/><a href="/">Go back to home</a>`)
})


app.get('/index', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + "/login.html")
})
.post('/login', (req, res)=>{
    let pass = false
    let user 
    let email = req.body.mail
    let pwd = req.body.pwd
    constants.users.forEach(element => {
        if (element.email==email && element.password==pwd) {
            pass = true
            console.log(`Username:${element.name}\nMail:${element.email}\nBalance:${element.balance}\nRef:${element.ref}`);
        }
    })
    res.send(message=pass? "match":"<script>alert('Wrong credentials');</script>")
})

app.get('/admin', (req, res)=>{
    constants.users.forEach(element => {
        showUser(element)
    });
    res.send("Users listed")
})


function showUser(user) {
    console.log(`Username:${user.name}\nMail:${user.email}\nBalance:${user.balance}\nRef:${user.ref}`);
}


app.listen(port, ()=>{
    console.log("App listening on port " + port);
})