/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE "order" (
            "order_id" SERIAL PRIMARY KEY,
            "customer_id" integer NOT NULL,
            "grand_total" numeric(10, 2) NOT NULL DEFAULT 0,
            "created_at" timestamp NOT NULL DEFAULT (current_timestamp)
        );
        ALTER TABLE "order" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id") ON DELETE CASCADE;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE "order";
        
    `);
};
