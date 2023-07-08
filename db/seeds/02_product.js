/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	return knex.raw(`
		DELETE FROM "product";
		ALTER SEQUENCE "product_product_id_seq" RESTART WITH 1;

		INSERT INTO "product" ("product_name", "quantity", "price") VALUES
			('Apple iPhone 13 Pro', 10, 999.99),
			('Samsung Galaxy S22 Ultra', 20, 1199.99),
			('Google Pixel 6 Pro', 30, 899.99),
			('OnePlus 9 Pro', 40, 799.99),
			('Xiaomi Mi 11 Ultra', 50, 699.99),
			('Sony Xperia 1 III', 60, 599.99),
			('Asus ROG Phone 5', 70, 499.99),
			('Motorola Edge 20 Pro', 80, 399.99),
			('Nokia X20', 90, 299.99),
			('LG Velvet 5G', 100, 199.99);
	`);
};
