
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Destiny'},
        {name: 'Steve'},
        {name: 'Tom'},
        {name: 'Arron'},
        {name: 'Josh'},
        {name: 'Christopher'},
        {name: 'Jamie'},
        {name: 'Mindy'}
      ]);
    });
};
