/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	return knex.raw(`
		DELETE FROM "order_item";
		ALTER SEQUENCE "order_item_order_item_id_seq" RESTART WITH 1;

		INSERT INTO "order_item" ("order_id", "product_id", "quantity", "base_price", "total_price") VALUES
			(1, 1, 1, 999.99, 999.99),
			(1, 6, 6, 599.99, 3599.94),
			(1, 2, 1, 1199.99, 1199.99),
			(1, 7, 6, 499.99, 2999.94),
			(2, 2, 2, 1199.99, 2399.98),
			(2, 7, 7, 499.99, 3499.93),
			(2, 4, 2, 799.99, 1599.98),
			(2, 3, 7, 899.99, 6299.93),
			(3, 3, 3, 899.99, 2699.97),
			(3, 8, 8, 399.99, 3199.92),
			(3, 5, 3, 699.99, 2099.97),
			(3, 9, 8, 299.99, 2399.92),
			(4, 4, 4, 799.99, 3199.96),
			(4, 9, 9, 299.99, 2699.91),
			(4, 10, 4, 199.99, 799.96),
			(5, 4, 5, 799.99, 3999.95),
			(5, 10, 10, 199.99, 1999.90),
			(5, 9, 9, 299.99, 2699.91);
	`);
};
