const express=require('express')

const router=express.Router();
const campgrounds=require('../controllers/campground')
const Campground=require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const {campgroundSchema}=require('../schemas')
const{isLoggedIn,validateCampground,isAuthor}=require('../middleware')
const {storage}=require('../cloudinary')
const multer=require('multer')
const upload=multer({storage})



router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'),(req,res)=>{
//     console.log(req.body,req.files)
//     res.send("IT worked")
// })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

//router.post('/',isLoggedIn,validateCampground,catchAsync(campgrounds.createCampground))

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


//router.get('/:id',catchAsync(campgrounds.showCampground))

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))

//router.put('/:id',isLoggedIn,isAuthor, validateCampground,catchAsync(campgrounds.updateCampground))

//router.delete('/:id',isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

module.exports=router;