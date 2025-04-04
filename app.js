if(process.env.NODE_ENV !=="production"){
    require('dotenv').config()
}

const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const app=express();
const session=require('express-session')
const flash=require('connect-flash')
// const Campground=require('./models/campground')
// const Review=require('./models/review')
//const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Joi=require('joi')
//const {campgroundSchema,reviewSchema}=require('./schemas')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/user')
const campgroundRoutes=require('./routes/campgrounds')
const reviewRoutes=require('./routes/reviews')
const userRouter=require('./routes/users')
const mongoSanitize=require('express-mongo-sanitize')
const { name } = require('ejs')
const helmet=require('helmet')

const MongoDBStore=require("connect-mongo")(session)



// 'mongodb://127.0.0.1:27017/yelp-camp'
const dbURL=process.env.DB_URL
mongoose.connect(dbURL)
.then(()=>{
    console.log("Mongo connection open")
})
.catch(err =>{
    console.log("oh no Mongo connection  error")
    console.log(err)
})



app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.engine('ejs', ejsMate)
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret=process.env.SECRET;

const store=new MongoDBStore({
    url:dbURL,
    secret,
    touchAfter: 24 * 60 * 60

})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(helmet({contentSecurityPolicy:false}))

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.tiles.mapbox.com/",
    // "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.mapbox.com/",
    // "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", 
];
const connectSrcUrls = [
    // "https://api.mapbox.com/",
    // "https://a.tiles.mapbox.com/",
    // "https://b.tiles.mapbox.com/",
    // "https://events.mapbox.com/",
    "https://api.maptiler.com/", 
];

const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/ds0hipthr/",
                "https://images.unsplash.com/",
                "https://api.maptiler.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next();
})




app.get('/',(req,res)=>{
    res.render('home')
})


app.use('/',userRouter)
app.use('/campgrounds',campgroundRoutes)

app.use('/campgrounds/:id/reviews',reviewRoutes)









app.all(('*'), (req, res, next) => {
    next(new ExpressError("Page not  found",404))
})
app.use((err,req,res,next)=>{
    // res.send("oh boi ")
    const {statusCode=500,message='Something went wrong'}=err;
    if(!err.message) err.message="oh no something went wrong"
    res.status(statusCode).render('error',{err});
    
})

app.listen('3000',(req,res)=>{
console.log("serving on port 3000")
})

//app.all(/(.*)/, (req, res, next) => {
