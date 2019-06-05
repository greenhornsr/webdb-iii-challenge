const express = require('express');
const dbCohorts = require('./cohortsModel');

const router = express.Router();

router.use(express.json())

router.get('/', (req, res) => {
    dbCohorts.find()
    .then(cohorts => {
        cohorts!==null ? res.status(200).json({success: true, message: 'Successfully retrieved cohorts!', cohorts}):
        res.status(404).json({success: false, message: 'Sorry, no cohorts currently in database!'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})
router.get('/:id', (req, res) => {

})
router.post('/', (req, res) => {

})
router.put('/:id', (req, res) => {

})
router.delete('/', (req, res) => {

})


// error middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `Unknown Error, Ref: ${hash}`, error }
}


module.exports = router;