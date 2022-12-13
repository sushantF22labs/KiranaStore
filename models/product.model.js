const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    Title : {type : String, require : true},
    Price : {type : Number, require : true},
    Category:{
       quality: {type : String, default : null}
    },
    Description:{type : String, require : true},
    Img:{type:String,require: true},
    userId : {type : String, require : true}
});

const ProductModel = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}