/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
	return knex.raw(`
		DELETE FROM "customer";
		ALTER SEQUENCE "customer_customer_id_seq" RESTART WITH 1;

		INSERT INTO "customer" ("customer_name") VALUES
			('Liam James'),
			('Olivia Rose'),
			('Emma Grace'),
			('Noah William'),
			('Ava Elizabeth');
	`);
};
