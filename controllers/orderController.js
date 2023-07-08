const orderModel = require("../models/orderModel.js");

const getOrders = async (req, res) => {
  console.log("asfhadgyf");
  const orders = await orderModel.listAllOrders();
  res.status(200).send(orders);
};

const createSingleOrder = async (req, res) => {
  try {
    let data = req.body;
    console.log("req,user",req.user)
    data = { ...data, customer_id: req.user.id };
    order = await orderModel.createSingleOrder(data);
    return res.status(200).send({
      status: 200,
      error: null,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      status: 400,
      data: null,
      error: error.message,
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const Order = await orderModel.getSingleOrder(id);
    if (Order.length === 0) {
      return res.status(400).send({
        status: 400,
        data: null,
        error: "Order not found",
      });
    } else {
      return res.status(200).send({
        status: 200,
        data: Order[0],
        error: null,
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 400,
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getSingleOrder,
  createSingleOrder,
};
