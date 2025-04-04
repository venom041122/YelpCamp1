// const mongoose=require('mongoose')
// const Campground=require('../models/campground')
// const cities = require('./cities')
// const {places,descriptors}=require('./seedHelpers')

// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
// .then(()=>{
//     console.log("Mongo connection open")
// })
// .catch(err =>{
//     console.log("oh no Mongo connection  error")
//     console.log(err)
// })

// const sample = array => array[Math.floor(Math.random() * array.length)];

// const seedDB=async()=>{
//     await Campground.deleteMany({});
//     for(let i=0;i<50;i++){
//         const rand100=Math.floor(Math.random()*1000);
//         const price=Math.floor(Math.random()*100);
//         const camp=new Campground({
//             author:'67e2e691b386d0587ee080f8',
//             location :`${cities[rand100].city}, ${cities[rand100].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ducimus minus soluta aspernatur harum animi, velit odit quae quasi mollitia aliquid amet, incidunt quo. Mollitia accusamus vel voluptatem libero possimus.',
//             price:price,
//             geometry:{
//               type:"Point",
//               coordinates:[-112.1331,477.0202]
//             },
//             images: [
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526389/YelpCamp/ioarvtyd9jpvxobjf49s.jpg',
//                   filename: 'YelpCamp/ioarvtyd9jpvxobjf49s'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526392/YelpCamp/jrki3v29vug7p5vsjr4v.jpg',
//                   filename: 'YelpCamp/jrki3v29vug7p5vsjr4v'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526392/YelpCamp/spzuyb800qtapqscqceh.jpg',
//                   filename: 'YelpCamp/spzuyb800qtapqscqceh'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/rfacetsluo3x9dnmnzxp.jpg',
//                   filename: 'YelpCamp/rfacetsluo3x9dnmnzxp'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/cez9vl90buqzwgispknc.jpg',
//                   filename: 'YelpCamp/cez9vl90buqzwgispknc'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/nlioivbnrvnqqnwjedve.jpg',
//                   filename: 'YelpCamp/nlioivbnrvnqqnwjedve'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526396/YelpCamp/lxlpwuhfuf0snjqwflzu.webp',
//                   filename: 'YelpCamp/lxlpwuhfuf0snjqwflzu'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526398/YelpCamp/npiryzfrasbaxaltkxez.jpg',
//                   filename: 'YelpCamp/npiryzfrasbaxaltkxez'
//                 },
//                 {
//                   url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526400/YelpCamp/ojxp0llg8cuplihyvcb0.jpg',
//                   filename: 'YelpCamp/ojxp0llg8cuplihyvcb0'
//                 }
//               ]

//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log("Mongo connection open")
})
.catch(err =>{
    console.log("oh no Mongo connection  error")
    console.log(err)
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const rand100=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*100);
        const camp=new Campground({
            author:'67e2e691b386d0587ee080f8',
            location :`${cities[rand100].city}, ${cities[rand100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ducimus minus soluta aspernatur harum animi, velit odit quae quasi mollitia aliquid amet, incidunt quo. Mollitia accusamus vel voluptatem libero possimus.',
            price:price,
            geometry:{
              type:"Point",
              coordinates:[
                cities[rand100].longitude,
                cities[rand100].latitude
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526389/YelpCamp/ioarvtyd9jpvxobjf49s.jpg',
                  filename: 'YelpCamp/ioarvtyd9jpvxobjf49s'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526392/YelpCamp/jrki3v29vug7p5vsjr4v.jpg',
                  filename: 'YelpCamp/jrki3v29vug7p5vsjr4v'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526392/YelpCamp/spzuyb800qtapqscqceh.jpg',
                  filename: 'YelpCamp/spzuyb800qtapqscqceh'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/rfacetsluo3x9dnmnzxp.jpg',
                  filename: 'YelpCamp/rfacetsluo3x9dnmnzxp'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/cez9vl90buqzwgispknc.jpg',
                  filename: 'YelpCamp/cez9vl90buqzwgispknc'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526394/YelpCamp/nlioivbnrvnqqnwjedve.jpg',
                  filename: 'YelpCamp/nlioivbnrvnqqnwjedve'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526396/YelpCamp/lxlpwuhfuf0snjqwflzu.webp',
                  filename: 'YelpCamp/lxlpwuhfuf0snjqwflzu'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526398/YelpCamp/npiryzfrasbaxaltkxez.jpg',
                  filename: 'YelpCamp/npiryzfrasbaxaltkxez'
                },
                {
                  url: 'https://res.cloudinary.com/ds0hipthr/image/upload/v1743526400/YelpCamp/ojxp0llg8cuplihyvcb0.jpg',
                  filename: 'YelpCamp/ojxp0llg8cuplihyvcb0'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})