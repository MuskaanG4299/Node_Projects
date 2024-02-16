//app.js
const express= require("express");
const path =require("path");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const app= express();
const mongoose= require("mongoose");
const port= process.env.PORT ||3000;
const NewsArticles = require("./models/newsArticles");
require("./db/conn.js")
const Register= require("./models/registers.js")

const static_path =path.join(__dirname,"../public");
const template_path =path.join(__dirname,"../templates/views");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.use(express.static(path.join(__dirname, '../public')));

const secretKey = crypto.randomBytes(32).toString('hex');
console.log("SecretKey"+secretKey);

app.set("view engine","ejs");
app.set("views",template_path);
app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/register",(req,res)=>{
    res.render("register");
})
//create new user in our database
app.post("/register",async(req,res)=>{
    try{
        const admin= new Register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
       const registered = await admin.save();
       res.status(201).render("login");
    }
    catch(error){
        res.status(400).send(error);
    }
})
app.get("/home", async (req, res) => {
    try {
        console.log("Fetching news data...");
        // Fetch news data from the NewsArticles collection
        const newsData = await NewsArticles.find({}).lean(); // Using .lean() for better performance
        console.log(newsData);
        // Render the home page and pass newsData to the template
        res.render("home", { newsData });
    } catch (error) {
        console.log(`Error fetching news data: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/index",(req,res)=>{
    res.render("index");
})
app.post("/submit_news", async (req, res) => {
    try {
        const newsArticle = new NewsArticles({
            title: req.body.title,
            description: req.body.description,
            summay: req.body.summay,
            imageUrl: req.body.imageUrl,
            date: req.body.publishedAt,
            type: req.body.type
        });

        const savedArticle = await newsArticle.save();
        res.status(201).redirect("/home"); // Redirect to home page after successfully adding news article
    } catch (error) {
        res.status(400).send(error);
    }
});





app.get("/login",(req,res)=>{
    res.render("login");
})
//login check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({ email: email });

        if (!user) {
            return res.status(400).send("User not found. Please register.");
        }

        if (user.password !== password) {
            return res.status(400).send("Invalid credentials. Please try again.");
        }

        // If authentication succeeds, redirect to the dashboard or homepage // Pass the fetched data as an object to the template
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        
        // Send the JWT token to the client
        res.cookie('token', token, { httpOnly: true });

        res.redirect("/home"); // Adjust the URL as needed

    } catch (error) {
        res.status(500).send(error.message);
    }
});
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }
        req.user = user;
        next();
    });
}
app.get("/protected", authenticateToken, (req, res) => {
    // This route is protected and requires authentication
    // You can access user information from req.user
    res.send(`Welcome ${req.user.email}! This is a protected route.`);
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
