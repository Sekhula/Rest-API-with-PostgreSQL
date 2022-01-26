const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000 
const db_shopping = require('../db/shopping_db') //Including user's crud file for quering the database CRUD
// const db_product = require('../db/products_CRUD'); // Including products crud file for quering the database CRUD

app.use(express.json())
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
)

app.get('/', (req, res) =>{
 res.json({info: 'Node.js, Express, and Postgres API'})
})

//====User=quiring=endpoints=Routes=path=binding=to=URL======= 
app.get('/users', db_shopping.getUsers)
app.get('/users/:id', db_shopping.getUserById)
app.post('/users', db_shopping.createUser)
app.put('/users/:id', db_shopping.updateUser)
app.delete('/users/:id', db_shopping.deleteUser)
//============================================================
//====Products=querying=endpoint=Routes=path=binding=to=URL===
app.get('/products', db_shopping.getAllProducts)
app.get('/products/:id', db_shopping.getProductById)
app.post('/products', db_shopping.addProduct)
app.put('/products/:id', db_shopping.updateProductsDetails)
app.delete('/products/:id', db_shopping.deleteProductById)
//============================================================

app.listen(port, () =>{
console.log(`App running on Port: ${port}.`)
})

