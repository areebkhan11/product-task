/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE "product" (
            "product_id" SERIAL PRIMARY KEY,
            "product_name" text NOT NULL,
            "quantity" integer NOT NULL,
            "price" numeric(10, 2) NOT NULL
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE "product";
    `);
};
