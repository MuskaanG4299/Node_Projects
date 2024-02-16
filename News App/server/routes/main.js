const express= require('express');
const router= express.Router();
const axios = require('axios');
const NewsArticle= require('../../models/newsArticles');

router.get('', async(req, res) => {
    const slides= await NewsArticle.find();
    console.log(slides);

    res.render('index',{title:'homepage',slides});
});
router.get('/sports', async (req, res) => {
    try {
        // Fetch only the slides with type 'Sports'
        const slides = await NewsArticle.find({ type: 'Sports' });
        res.render('sports', { title: 'Sport Page', slides });
    } catch (error) {
        console.error('Error fetching sports slides:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/about',(req,res)=>{
    res.render('about');
});
router.get('/contact',(req,res)=>{
    res.render('contact');
});


module.exports= router;