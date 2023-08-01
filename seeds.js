const mongoose=require('mongoose');
const Product=require('./models/product.js')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{useNewUrlParser: true})
    .then(()=>{
        console.log("CONNECTION OPEN")
    })
    .catch(err=>{
        console.log("Error")
        console.log(err)
    })


// const p=new Product({
//     name: 'Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p=>{
//     console.log(p)
// })
// .catch(err=>{
//     console.log(err)
// })
const seedProducts=[
    {name: 'Grapefruit', price: 1.99, category: 'fruit'},
    {name: 'Carrot', price: 0.50, category: 'vegetable'},
    {name: 'Milk', price: 1.50, category: 'dairy'},
    {name: 'Banana', price: 0.99, category: 'fruit'}
    
]
Product.insertMany(seedProducts)
.then(res=>{console.log(res)})
.catch(err=>{console.log(err)})


