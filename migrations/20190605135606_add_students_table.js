
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();  // adds primary key that auto-increments

        tbl
        .string('name', 255)
        .notNullable()

        tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

        tbl
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
