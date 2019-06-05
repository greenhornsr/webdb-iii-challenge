const db = require('../data/dbConfig');


module.exports = {
    find,
    findById,
    // findStudentsInCohort,
    add,
    update,
    remove
}

function find() {
    return db('students')
} 

function findById(id) {
    return db('students')
    .where({id})
    .first()
} 

// function findStudentsInCohort(id) {
//     return db.select('*')
//     .from('students')
//     .leftJoin('cohorts', `cohorts.id`, 'students.cohort_id')
//     .where('cohorts.id', id)
// }


async function add(newStudent) {
    const [id] = await db('students')
    .insert(newStudent);

    return findById(id);
} 

function update(id, changes) {
    return db('students')
    .where({id})
    .first()
    .update(changes)
} 

function remove(id) {
    return db('students')
    .where({id})
    .delete()
} 