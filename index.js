const express = require('express')
const app = express();
// knex
const knex = require('./db/client')
// path
const path = require('path')
app.use(express.static(path.join(__dirname,'public')))
// view
app.set('view engine', 'ejs')
app.set('views','views')
// url Parser
app.use(express.urlencoded({extended: true}))
// cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// logger
const logger = require("morgan")
app.use(logger('dev'))



// local username for display in navbar
app.use((req,res,next)=>{
    if(req.cookies.username){
        res.locals.username = req.cookies.username
    }else{
        res.locals.username = undefined
    }
    next();
})





// routes
// app.get("/", (req, res)=>{
//     res.render('clucks')
// })
app.get("/sign_in",(req,res)=>{
    res.render('sign_in')
})
app.post("/sign_in",(req,res)=>{
    const Cookie_Max_Age = 1000 * 60 * 60 * 24
    const username = req.body.username
    res.cookie('username',username, {MaxAge: Cookie_Max_Age})
    res.redirect('/')
})
app.post('/sign_out',(req, res)=>{
    res.clearCookie('username')
    res.redirect('/')
})

// // setting up the router
const cluckRouter = require('./routes/clucks')
app.use('/',cluckRouter)



PORT = 2300
DOMAIN = "localhost"

app.listen(PORT,DOMAIN, ()=>{
    console.log(`app is litening on ->> ${DOMAIN}:${PORT} `);
})