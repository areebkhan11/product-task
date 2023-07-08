/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE "customer" (
            "customer_id" SERIAL PRIMARY KEY,
            "customer_name" text NOT NULL,
            "email" text NOT NULL,
            "password" text NOT NULL
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE "customer";
    `);
};
