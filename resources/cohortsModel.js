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

function add() {
    return null
} 

function update() {
    return null
} 

function remove() {
    return null
} 
