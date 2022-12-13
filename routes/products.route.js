const { Router } = require("express");
require("dotenv").config();

const { ProductModel } = require("../models/product.model");

const productController = Router();

productController.get("/", async (req, res) => {
  let {skip,limit}= req.query;
  const result = await ProductModel.find().skip(skip).limit(limit);
  const count= await ProductModel.find().count()
    res.send({result,count});
})

productController.get("/:id", async (req, res) => {
  let {skip,limit}= req.query;
  const result = await ProductModel.findById(req.params.id).skip(skip).limit(limit);
  const count= await ProductModel.find().count()
  res.send({result,count});
});

productController.post("/", async (req, res) => {
  const payload = req.body;
  const new_prod = new ProductModel(payload);
  await new_prod.save();
  res.send(new_prod);
});

productController.patch("/:id",async(req,res)=>{
   const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log("product updated");
  res.send(data)
})

productController.put("/:id",async(req,res)=>{
  const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log("product updated");
  res.send(data)
})

productController.delete("/:id", async (req, res) => {
  const deletedProd = await ProductModel.findOneAndDelete({_id: req.params.id})
  res.send(deletedProd);
  console.log("product deleted");
})

module.exports = { productController };
