const customerModel = require("../models/customerModel.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../service/jwtservice.js");
const cookie = require("cookie");

const getCustomers = async (req, res) => {
  const customers = await customerModel.listAllCustomers();
  res.status(200).send(customers);
};
const createCustomer = async (req, res) => {
  try {
    let user = req.body;
    let customer = await customerModel.getCustomerByEmail(user.email);
    if (customer.length > 0) {
      return res.status(400).send({
        status: 400,
        data: null,
        error: "user already exist",
      });
    } else {
      customer = await customerModel.createCustomer(user);
      delete customer.password;
      return res.status(200).send({
        status: 200,
        data: customer,
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

const loginCustomer = async (req, res) => {
  try {
    const user = req.body;
    let customer = await customerModel.getCustomerByEmail(user.email);
    if (customer.length === 0) {
      return res.status(400).send({
        status: 400,
        data: null,
        error: "email or password is incorrect",
      });
    } else {
      const confirmPassword = await bcrypt.compare(
        user.password,
        customer[0].password
      );
      if (confirmPassword) {
        let token = generateToken({ id: customer[0].customer_id });
        const cookieOptions = {
          maxAge: 3600, // Expires in 1 hour (in seconds)
          httpOnly: true, // Cookie is only accessible through HTTP(S) requests, not JavaScript
          secure: true, // Cookie is only sent over HTTPS
          sameSite: "strict", // Cookie is only sent for same-site requests
        };

        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .send({
            status: 200,
            data: "Login Successful",
            error: null,
          });
      } else {
        return res.status(400).send({
          status: 400,
          data: null,
          error: "email or password is incorrect",
        });
      }
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
  getCustomers,
  createCustomer,
  loginCustomer,
};
