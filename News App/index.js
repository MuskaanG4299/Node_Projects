require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5000;
const NewsArticle = require('./models/newsArticles');

mongoose.connect('mongodb://mongo_db:27017/NewsArticles', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', async () => {
//     console.log('Connected to the database!');

//     try {
//         const sampleData = [
//             {
//                 title: 'Apple Unveils New MacBook Pro with M1 Pro and M1 Max Chips',
//                 summary: 'Apple introduces the all-new MacBook Pro lineup featuring powerful M1 Pro.',
//                 imageUrl: '/img/mac.jpg',
//                 description:'The latest MacBook Pro models boast impressive enhancements, including a Liquid Retina XDR display, up to 64GB of unified memory, and advanced connectivity options, setting new standards for professional users.',
//                 date: new Date(),
//                 type: 'Tech',
//             },
//             {
//                 title: 'Meta Introduces Horizon Worlds, a Shared Virtual Reality Experience',
//                 summary: 'Meta launches Horizon Worlds, a virtual reality platform allowing users to explore, create, and interact with others in immersive virtual environments.',
//                 imageUrl: '/img/meta.jpg',
//                 date: new Date(),
//                 description:'Horizon Worlds enables users to build their own virtual worlds, engage in collaborative activities, and attend events, fostering social connections and creativity in the metaverse.',
//                 type: 'Tech',
//             },
//             {
//                 title: 'Microsoft Unveils Windows 11 SE for Education',
//                 summary: 'Microsoft announces Windows 11 SE, a tailored version of its operating system designed specifically for educational institutions.',
//                 imageUrl: '/img/MICROSOFT-1.jpg',
//                 description:' Windows 11 SE offers simplified management tools, enhanced security features, and compatibility with a wide range of educational apps, empowering teachers and students to collaborate and learn effectively.',
//                 date: new Date(),
//                 type: 'Tech',
//             },
//             {
//                 title: 'Messi Wins FIFA Mens Player of the Year Award for Record 7th Time',
//                 summary: 'Lionel Messi clinches the FIFA Mens Player of the Year award for an unprecedented seventh time, reaffirming his status as one of footballs greatest players.',
//                 imageUrl: '/img/messi.jpg',
//                 description:'Messi remarkable achievements throughout the year, including leading Argentina to Copa America glory and exceptional performances with Paris Saint-Germain, earned him the prestigious accolade once again.',
//                 date: new Date(),
//                 type: 'Sports',
//             },
            
//         ];

//         await NewsArticle.insertMany(sampleData);
//         console.log('Sample data inserted successfully!');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//     } finally {
//         // Close the database connection after inserting data
//         mongoose.connection.close();
//     }
// });

app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
