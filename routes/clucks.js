const express = require('express')
const router  = express.Router();
const knex = require('../db/client')
const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en.json')
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US') 

router.get('/', (req, res) => {
    knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {
        for (cluck of clucks) {
            let seconds  = new Date() - cluck.created_at
            let time = timeAgo.format(Date.now() - seconds)
            cluck.created_at = time
        }
        res.render('clucks', {clucks: clucks})
    })
});
router.post('/new',(req,res)=>{
    if(req.cookies.username){
        knex('clucks')
        .insert({
            username: req.cookies.username,
            imageUrl: req.body.imageUrl,
            content: req.body.content
        })
        .returning('*')
        .orderBy('created_at', 'desc')
        .then(clucks => {
            res.render('clucks',{clucks:clucks})
        })
    }else{
        res.render('clucks')
    }
})
router.get("/new",(req,res)=>{
    if(req.cookies.username){
        res.render('new_cluck')
    }else{
        res.render('sign_in')
    }
})
router.get('/:id')




module.exports = router;