const knex = require("../db/knex.js");
const bcrypt = require('bcrypt');


const listAllCustomers = async () => {
  const data = await knex.raw(`SELECT * FROM "customer";`);
  return data.rows;
};

const createCustomer = async (user) => {
  let hashPassword = await bcrypt.hash(user.password, 10);

  const [insertedData] = await knex("customer")
    .insert({
      customer_name: user.customerName,
      email: user.email,
      password: hashPassword,
    })
    .returning("*");

  return insertedData;
};

const getCustomerByEmail = async (email) =>{
    const data = await knex.raw(`SELECT * FROM customer WHERE email = '${email}'`);
  return data.rows
}

module.exports = {
  listAllCustomers,
  createCustomer,
  getCustomerByEmail
};
