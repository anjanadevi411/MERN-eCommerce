const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//middleware
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Product was not found in the DB",
        });
      }
      req.product = product;
      next();
    });
};

//creating the product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (error) {
      return res.status(400).json({ error: "Problem with Image" });
    }

    //destructuring the feilds
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: "please include all the fields" });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //saving to the database
    product.save((err, product) => {
      if (error) {
        return res.status(400).json({
          error: "Saving product T-shirt in DB failed ",
        });
      }
      return res.json(product);
    });
  });
};
