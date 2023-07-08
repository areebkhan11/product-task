/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE "order_item" (
            "order_item_id" SERIAL PRIMARY KEY,
            "order_id" integer NOT NULL,
            "product_id" integer NOT NULL,
            "quantity" integer NOT NULL,
            "base_price" numeric(10, 2) NOT NULL,
            "total_price" numeric(10, 2) NOT NULL
        );
        ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("order_id") ON DELETE CASCADE;
        ALTER TABLE "order_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE CASCADE;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE "order_item";
    `);
};
