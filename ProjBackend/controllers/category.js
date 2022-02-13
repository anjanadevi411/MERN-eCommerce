const Category = require("../models/category");

//middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "Category was not found in the DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Not able to save category in the DB ",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(400).json({
        error: "Not categories found ",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category; //it is extracting or populating from the parameter (coming from middleware)
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category; //it is extracting or populating from the parameter (coming from middleware)
  category.remove((err, category) => {
    if (err) {
      res.status(400).json({
        error: "Failed to delete the category",
      });
    }
    res.json({
      message: `Successfully deleted the ${category}`,
    });
  });
};
