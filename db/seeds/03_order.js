/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	return knex.raw(`
		DELETE FROM "order";
		ALTER SEQUENCE "order_order_id_seq" RESTART WITH 1;

		INSERT INTO "order" ("customer_id", "grand_total") VALUES
			(1, 8799.86),
			(2, 13799.82),
			(3, 10399.78),
			(1, 6699.83),
			(5, 8699.76);
	`);
};
