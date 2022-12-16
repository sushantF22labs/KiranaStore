const { Router } = require("express");
require("dotenv").config();

const { ProductModel } = require("../models/product.model");

const productController = Router();
// Getting data
// productController.get("/", async (req, res) => {
//   let {skip,limit}= req.query;
//   const data = await ProductModel.find().skip(skip).limit(limit);
//   const count= await ProductModel.find().count();
//     res.send({data,count});



// })
// Search functionality
productController.get("/", async (req,res) => {
  let { page, limit } = req.query;
  console.log(req.query.title);
  console.log(req.query.price);
  try {
     if (req.query.title) {
      const data = await ProductModel.find({
        title: { $regex: req.query.title },
      });
      res.send({ data: data });
    } else if (req.query.title && req.query.price) {
      const data = await ProductModel.find({
        $and: [
          { title: { $regex: req.query.title } },
          { price: { $regex: req.query.price } },
        ],
      });
      res.send({ data: data });
    }else {
      let data = await ProductModel.find().skip(page).limit(limit);
      let count = await ProductModel.find().count();
      res.status(200).send({ data: data, totalCount: count });
    }
  } catch {
    res.status(204).send({ message: "data not found" });
  }
});


//getting data by _id
productController.get("/:id", async (req, res) => {
  let {skip,limit}= req.query;
  const result = await ProductModel.findById(req.params.id).skip(skip).limit(limit);
  const count= await ProductModel.find().count()
  res.send({result,count});
});

//Add data Post operation added new data
productController.post("/", async (req, res) => {
  const payload = req.body;
  const new_prod = new ProductModel(payload);
  await new_prod.save();
  res.send(new_prod);
});

//Update data 
productController.patch("/:id",async(req,res)=>{
   const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log("product updated");
  res.send(data)
})

// Update data
productController.put("/:id",async(req,res)=>{
  const data=await ProductModel.findByIdAndUpdate(req.params.id,req.body)
  console.log("product updated");
  res.send(data)
})

//Delete by _id
productController.delete("/:id", async (req, res) => {
  const deletedProd = await ProductModel.findOneAndDelete({_id: req.params.id})
  res.send(deletedProd);
  console.log("product deleted");
})

module.exports = { productController };
