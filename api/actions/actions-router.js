// Write your "actions" router here!
const express = require('express');
const { validateAction, ensureActionIdExists } = require('./actions-middlware');
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Actions could not be retrieved'});
        })
});
router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'action could not be added to project'
            });
        });
});
router.get('/:id', ensureActionIdExists, (req, res, next) => {
    res.status(200).json(req.existingAction);
});
router.put('/:id', ensureActionIdExists, validateAction, (req, res, next) => {
    const id = req.existingAction.id;
    const changes = req.action;
    
    Actions.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Action could not be updated'
            })
        })

});
router.delete('/:id', ensureActionIdExists, (req, res, next) => {
    const deletedAction = req.existingAction;

    Actions.remove(deletedAction.id)
        .then(() => {
            res.status(200).json();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                messgae: 'Action could not be removed'
            });
        });
});

module.exports = router;