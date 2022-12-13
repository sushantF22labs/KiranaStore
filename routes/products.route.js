const { Router } = require("express");
require("dotenv").config();

const { ProductModel } = require("../models/product.model");

const productController = Router();

productController.get("/", async (req, res) => {
  let {page,limit}= req.query;
  const result = await ProductModel.find().skip(page).limit(limit);
  
    res.send(result);
})

productController.get("/:id", async (req, res) => {
  let {page,limit}= req.query;
  const result = await ProductModel.findById(req.params.id).skip(page).limit(limit);
    res.send(result);
});

productController.post("/", async (req, res) => {
  const payload = req.body;
  const new_prod = new ProductModel(payload);
  await new_prod.save();
  res.send(new_prod);
});

productController.patch("/:id",async(req,res)=>{
   const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log(data);
  res.send("product updated")
})

productController.put("/:id",async(req,res)=>{
  const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log(data);
  res.send("product updated")
    res.send("put is working");
})

productController.delete("/:id", async (req, res) => {
  const deletedProd = await ProductModel.findOneAndDelete({_id: req.params.id})
  res.send(deletedProd);
})

module.exports = { productController };
