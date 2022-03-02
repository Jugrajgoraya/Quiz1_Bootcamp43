const express = require('express')
const router  = express.Router();
const knex = require('../db/client')

router.get('/', (req, res) => {
    knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {
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