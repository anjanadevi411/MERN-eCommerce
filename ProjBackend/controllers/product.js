const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");

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

  form.parse(req, (err, fields, file) => {
    if (err) {
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
    //console.log(product);
    //saving to the database
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving product T-shirt in DB failed ",
        });
      }
      res.json(product);
    });
  });
};

//get product
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//for loading photo's middleware so that it will not crash
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//update route

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Problem with Image" });
    }

    //updation code
    let product = req.product;
    product = _.extend(product, fields);

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
      if (err) {
        res.status(400).json({
          error: "Updation failed ",
        });
      }
      res.json(product);
    });
  });
};

//Delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete the product" });
    }
    res.json({ message: "Product got deleted successfully", deletedProduct });
  });
};

//listing all the products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id ";
  Product.find()
    .limit(limit)
    .populate("category")
    .sort([[sortBy, "asc"]])
    .select("-photo")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ errror: "No Products Found" });
      }
      res.json(products);
    });
};

//updating Stocks and Sold products
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({ error: "Bulk operation failed" });
    }
    next();
  });
};

//getting all unique categories
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "No category found" });
    }
    res.json(category);
  });
};
