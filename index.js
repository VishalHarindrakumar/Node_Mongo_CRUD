const express=require('express');
const app=express();
const path=require('path')
const mongoose=require('mongoose');
const Product=require('./models/product.js')
const methodOverride=require('method-override')



mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{useNewUrlParser: true})
    .then(()=>{
        console.log("CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("Error")
        console.log(err)
    })



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/products',async (req,res)=>{
    const products=await Product.find({})
    res.render('products/index',{products});
})
app.post('/products',async (req,res)=>{
    
    const newP=new Product(req.body);
    await newP.save();
    console.log(newP)
    res.redirect("/products")

})

categories=['fruit','vegetable','dairy']

app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.get('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    console.log(product);
    res.render('products/show',{product});
})

app.get('/products/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{product,categories})
})

app.put('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{new: true,runValidators:true })
    console.log(req.body)
    res.redirect(`/products/${product._id}`)

})

app.delete('/products/:id',async (req,res)=>{
    
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/products');
})

app.listen(3000,()=>{
    console.log("LISTENING 3000")
})