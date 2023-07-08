const knex = require("../db/knex.js");

const listAllOrders = async () => {
  try {
    const data = await knex.raw(`SELECT
        o.order_id,
        o.customer_id,
        o.grand_total,
        o.created_at,
        json_agg(json_build_object(
            'order_item_id', oi.order_item_id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'base_price', oi.base_price,
            'total_price', oi.total_price
        )) AS order_items
    FROM
        "order" AS o
    JOIN
        "order_item" AS oi
    ON
        o.order_id = oi.order_id
    GROUP BY
        o.order_id;`);
    const orders = data.rows;
    // for(let i = 0; i < orders.length; i++) {
    //     let orderItem = await knex.raw(`SELECT order_item_id, product_id, quantity, base_price, total_price FROM "order_item" WHERE order_id = ${orders[i].order_id};`);
    //     orders[i].order_items = orderItem.rows;
    // }
    return orders;
  } catch (err) {
    console.log(err);
  }
};

const createSingleOrder = async (data) => {
  try {
    const { customer_id, product_id, quantity } = data;
    console.log("data", data);

    await knex.transaction(async (trx) => {
      try {
        // Retrieve the base_price and calculate the total_price from the "product" table
        const { price } = await trx("product")
          .select("price")
          .where("product_id", product_id)
          .first();

        const total_price = price * quantity;

        // Insert the order into the "order" table
        let [orderIdArray] = await trx("order")
          .insert({ customer_id, grand_total: 0 })
          .returning("*");
        console.log("orderIdArray", orderIdArray);
        let orderId = orderIdArray.order_id;
        // Insert the order item into the "order_item" table
        await trx("order_item").insert({
          order_id: orderId,
          product_id,
          quantity,
          base_price: price,
          total_price,
        });

        // Update the grand_total in the "order" table
        const total = await trx("order_item")
          .where("order_id", orderId)
          .sum("total_price as total")
          .first();

        await trx("order")
          .where("order_id", orderId)
          .update({ grand_total: total.total });

        // Decrement the product quantity in the "product" table
        await trx("product")
          .where("product_id", product_id)
          .decrement("quantity", quantity);

        await trx.commit();
      } catch (error) {
        console.log("errorwaa", error);
        await trx.rollback();
        throw error;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleOrder = async (orderId) => {
  try {
    const data = await knex.raw(
      `
  SELECT
      o.order_id,
      o.customer_id,
      o.grand_total,
      o.created_at,
      json_agg(json_build_object(
          'order_item_id', oi.order_item_id,
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'base_price', oi.base_price,
          'total_price', oi.total_price
      )) AS order_items
  FROM
      "order" AS o
  JOIN
      "order_item" AS oi ON o.order_id = oi.order_id
  WHERE
      o.order_id = :orderId
  GROUP BY
      o.order_id;
`,
      { orderId }
    );
    const orders = data.rows;

    return orders;
  } catch (error) {
    console.log(err);
  }
};

module.exports = {
  listAllOrders,
  createSingleOrder,
  getSingleOrder,
};
