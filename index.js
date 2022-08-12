const express = require('express')
const cors = require('cors')
const app = express()
const product = require('./product')
const { response } = require('express')

app.use(cors())
app.use(express.json())

app.get('/',(req, res) =>{
    res.json(product)
})

//get a products
app.get('/api/product/:id', async (req, res) => {
    const item = await product.find((product) => product.id === Number(req.params.id));

    if(item) {
        res.json(item);
    } else {
        res.status(400).send({ message: 'Product not found.'});
    }
});

//create product
app.put('/api/product', (req, res) => {
    const newProd = req.body
  if (!newProd) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).send({ success: true, data: [...product, newProd] })
})

//update product
app.post('/api/post/:id', async (req, res) => {
    // const updatedProduct = new product ({
    //     name: req.body.name,
    //     price: req.body.price,
    //     category: req.body.category
    // });
    const { id } = req.params
    const { name } = req.body
  
    const postProd = product.find((postProd) => product.id === Number(id))
  
    if (!postProd) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` })
    }
    const newProd = product.map((postProd) => {
      if (postProd.id === Number(id)) {
        postProd.name = name
      }
      return postProd
    })
    res.status(200).json({ success: true, data: newProd })


})

//delete product
app.delete('/api/product/:id', (req, res) => {
    // find product
    const delproduct = product.find((product) => product.id === Number(req.params.id));
    if (!delproduct) {
        return res.status(400).json({ success: false, msg: `no person with id ${id}`})
    }

    const newProduct = product.filter((product) => product.id !== Number(req.params.id))
    return res.status(200).json({ success: true, list:[...newProduct]})
})

app.listen(3000, ()=>{
    console.log('CORS-enabled web server listening on PORT 80..');
})