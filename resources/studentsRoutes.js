const express = require('express');
const dbStudents = require('./studentsModel');

const router = express.Router();

router.use(express.json())

router.get('/', (req, res) => {
    dbStudents.find()
    .then(students => {
        students!==null ? res.status(200).json({success: true, message: 'Successfully retrieved cohorts!', students}):
        res.status(404).json({success: false, message: 'Sorry, no cohorts currently in database!'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})
router.get('/:id', validateStudenttID, (req, res) => {
    const {id} = req.params
    dbStudents.findById(id)
    .then(student => {
        // console.log(cohort)
        student ? res.status(200).json({success: true, message: `Cohort:${student.name} with id: ${id} has been located`, student}):
        res.status(404).json({success: false, message: `Sorry, no cohort with id of ${id} exists.`  })
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.post('/', validateBodyName, (req, res) => {
    const newStudent = req.body
    dbStudents.add(newStudent)
    .then(count => {
        const unit = count > 1 ? 'students': 'student';
        count ? res.status(201).json({success: true, message: `${newStudent.name} ${unit} created`, newStudent}):
        res.status(400).json({success: false, message: 'could not add new'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    dbStudents.update(id, changes)
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
    const student = req.body
    dbStudents.remove(id)
    .then(count => {
        if(count){
            const studentunit = count > 1 ? 'students': 'student';
            res.status(200).json({message: `${count} ${studentunit} deleted`, Student_deleted: student})
        }else{
            res.status(404).json({message: 'Student not found'})
        }
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

// validation middleware
function validateStudenttID(req, res, next) {
    // console.log(req.params)
    dbStudents.find(req.params.id)
    .then(student => {
        if(student){ 
        req.student = student
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