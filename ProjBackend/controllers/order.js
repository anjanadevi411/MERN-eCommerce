const { Order, ProductCart } = require("../models/order");

//middleware
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        res.status(400).json({
          error: "Order was not found in the DB",
        });
      }
      req.order = order;
      next();
    });
};

//create controller for order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ error: "Failed to save order in DB" });
    }
    res.json(order);
  });
};

//get all orders
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "No orders found in DB" });
      }
      res.json(order);
    });
};

//get Order status
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

//updating the status
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: "Cannot update order status" });
      }
      res.json(order);
    }
  );
};
