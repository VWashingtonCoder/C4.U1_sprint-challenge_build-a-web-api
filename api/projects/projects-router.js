// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { ensureProjectIdExists, validateProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Projects could not be retrieved'});
        })
});
router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.validProject)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Project could not be added'
        })
    })
});
router.get('/:id', ensureProjectIdExists, (req, res, next) => {
    res.status(200).json(req.existingProject)
});
router.put('/:id', ensureProjectIdExists, validateProject, (req, res, next) => {
    const id = req.existingProject.id;
    const changes = req.validProject;

    Projects.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                messgae: 'Project could not be updated'
            })
        })
});
router.delete('/:id', ensureProjectIdExists, (req, res, next) => {
    const id = req.existingProject.id;
    const removedProject = req.existingProject;

    Projects.remove(id)
        .then(() => {
            res.status(200).json(removedProject)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                messgae: 'Project could not be removed'
            })
        })
});
router.get('/:id/actions', ensureProjectIdExists, (req, res, next) => {
    const id = req.existingProject.id;

    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                messgae: 'Project actions could not be retrieved'
            })
        })
});

module.exports = router;