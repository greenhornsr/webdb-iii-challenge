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
router.get('/:id', validateCohortID, (req, res) => {
    const {id} = req.params
    dbCohorts.findById(id)
    .then(cohort => {
        // console.log(cohort)
        cohort ? res.status(200).json({success: true, message: `Cohort:${cohort.name} with id: ${id} has been located`, cohort}):
        res.status(404).json({success: false, message: `Sorry, no cohort with id of ${id} exists.`  })
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.get('/:id/students', (req, res) => {
    const {id} = req.params
    dbCohorts.findStudentsInCohort(id)
    .then(studentsinCohort => {
        // console.log(cohort)
        studentsinCohort ? res.status(200).json({success: true, message: `located`, studentsinCohort}):
        res.status(404).json({success: false, message: `Sorry, no cohort with id of ${id} exists.`  })
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.post('/', validateBodyName, (req, res) => {
    const newCohort = req.body
    dbCohorts.add(newCohort)
    .then(count => {
        const unit = count > 1 ? 'cohorts': 'cohort';
        count ? res.status(201).json({success: true, message: `${newCohort.name} ${unit} created`, newCohort}):
        res.status(400).json({success: false, message: 'could not add new'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    dbCohorts.update(id, changes)
    .then(count => {
        const unit = count > 1 ?'changes': 'change'
        count ? res.status(200).json({success: true, message: `${count} ${unit} made`, changes}):
        res.status(404).json({success: false, message: `${id} doesnt exist`})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const cohort = req.body
    dbCohorts.remove(id)
    .then(count => {
        if(count){
            const cohortunit = count > 1 ? 'cohorts': 'cohort';
            res.status(200).json({message: `${count} ${cohortunit} deleted`, Cohortdeleted: cohort})
        }else{
            res.status(404).json({message: 'Cohort not found'})
        }
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

// validation middleware
function validateCohortID(req, res, next) {
    // console.log(req.params)
    dbCohorts.find(req.params.id)
    .then(cohort => {
        if(cohort){ 
        req.cohort = cohort
        next()
        }else{
            res.status(400).json({ message: 'Invalid cohort id!' })
        }
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
} 

function validateBodyName(req, res, next) {
    if(req.body.name){
        next()
    }else{
        res.send('name field required!')
    }
}


// error middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `Unknown Error, Ref: ${hash}`, error }
}


module.exports = router;