const db = require('../data/dbConfig');


module.exports = {
    find,
    findById,
    findStudentsInCohort,
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

function findStudentsInCohort(id) {
    return db.select('cohorts.*', 'students.*')
    .from('students')
    .leftJoin('cohorts', `cohorts.id`, 'students.cohort_id')
    .where('cohorts.id', id)
}


async function add(newCohort) {
    const [id] = await db('cohorts')
    .insert(newCohort);

    return findById(id);
} 

function update(id, changes) {
    return db('cohorts')
    .where({id})
    .first()
    .update(changes)
} 

function remove(id) {
    return db('cohorts')
    .where({id})
    .delete()
} 
