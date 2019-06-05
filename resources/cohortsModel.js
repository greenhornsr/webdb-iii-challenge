const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('cohorts')
} 

function findById(id) {
    return db('cohorts')
    .where({id})
    .first()
} 

async function add(newCohort) {
    const [id] = await db('cohorts')
    .insert(newCohort);

    return findById(id);
} 

function update() {
    return null
} 

function remove() {
    return null
} 
