const client = require('../app/connect');

client.connect(); // Connect to database

//Get All users in a DATABASE
const getUsers = (req, res) =>{
    client.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) =>{
         if (error){
           throw error
          }
        res.status(200).json(results.rows);
     }) 
     console.log(res.rows);
}

//GET a single  User by ID
const getUserById = (req, res) => {
     const id = parseInt(req.params.id)

    client.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) =>{
         if(error) {
        throw error
        }
      res.status(200).json(results.rows);
    })
}

//POST a new user
const createUser = (req, res) => {
  const user = {
    name: req.body.name,
    username: req.body.email,
    password: req.body.password, 
    address: req.body.address,
    email: req.body.email,
    mobile_number: req.body.mobile
  }
   
  //console.log();
  client.query(`INSERT INTO users (full_names, password, email, address, mobile_number) VALUES ($1, $2, $3, $4, $5)`,
  [user.name, user.password, user.email, user.address, user.mobile_number],

  (error, results) => {
    if (error) {
      res.status(400).send(error);
      throw error;
    }
    res.status(201).send(`User added with ID:${results}`);
  }
  );
};

//PUT updated data in an exisiting user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const user = {
    name: req.body.name,
    username: req.body.email,
    password: req.body.password, 
    address: req.body.address,
    email: req.body.email,
    mobile_number: req.body.mobile_number
  }

  client.query('UPDATE users SET name = $1, password = $2, email = $3, address = $4, mobile_number = $5  WHERE user_id = $6',
  [user.name, user.password, user.email, user.address, user.mobile_number, id],
    (error, results) => {
      if( error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
}

//DELETE a user
const deleteUser = (req, res) =>{
  const id = parseInt(req.params.id)
 
 client.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
   if (error){
   throw error
  }
  res.status(200).send(`Users deleted with ID: ${id}`);
 });
}
//=====================================end=User+crud======================================================
//===========================Get=All=Products=============================================================
const getAllProducts = (req, res) =>{
  client.query('SELECT * FROM products ORDER BY product_id ASC', (error, results) =>{
       if (error){
         throw error
        }
      res.status(200).json(results.rows);
   }) 
   //console.log(res.rows);
}

//GET a single  User by ID
const getProductById = (req, res) => {
   const id = parseInt(req.params.id)

  client.query('SELECT * FROM products WHERE product_id = $1', [id], (error, results) =>{
       if(error) {
      throw error
      }
    res.status(200).json(results.rows)
  })
}

//POST a new user
const addProduct = async(req, res) => {
  const item = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    thumbnail: req.body.thumbnail,
    pro_picture: req.body.pro_picture
  };

  const disc = "discount for " + item.name;
  const discount = 0;
  
  client.query(`INSERT INTO discount(discount_perc, description) values($1, $2) returning discount_id`,
    [discount, disc],
    (error, results) => {

      const disc_id = results.rows[0].discount_id;
      //Sub query
      client.query(`INSERT INTO products (name, description, pro_price, pro_category, quantity, thumbnail, discount_id, pro_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [item.name, item.description, item.price, item.category, item.quantity, item.thumbnail, disc_id, item.pro_picture],

      (error, results) => {
          if (error) {
            console.log(error)
            throw error;
          }
       }
      );
      if (error) {
        res.status(400).send(error);
        throw error;
      }
      res.status(201).send(`Product added with ID:${disc_id}`);
    }
  );
}

//PUT updated data in an exisiting user
const updateProductsDetails = (req, res) => {
const id = parseInt(req.params.id)
const item = {
  name: req.body.name,
  description: req.body.description,
  pro_price: req.body.pro_price,
  pro_category: req.body.pro_category,
  thumbnail: req.body.thumbnail,
  pro_picture: req.body.pro_picture
}

client.query('UPDATE products SET name = $1, description = $2, pro_price = $3, pro_category = $4, thumbnail = $5, pro_picture = $7  WHERE product_id = $6',
[item.name, item.description, item.pro_price, item.pro_category, item.thumbnail, id, item.pro_picture],
  (error, results) => {
    if( error) {
      throw error
    }
    res.status(200).send(`Product modified with ID: ${id}`);
  }
);
}

//DELETE a product
const deleteProductById = (req, res) =>{
const id = parseInt(req.params.id)

client.query('DELETE FROM products WHERE product_id = $1', [id], (error, results) => {
  if (error){
      throw error;
  }
  res.status(200).send(`Product deleted with ID: ${id}`)
});
}

//Exporting CRUD functions in a REST API
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser, //End user's CRUD

  getAllProducts,
  getProductById,
  addProduct,
  updateProductsDetails,
  deleteProductById,
}
//client.end();
