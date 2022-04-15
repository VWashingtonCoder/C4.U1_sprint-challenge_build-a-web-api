// add middlewares here related to actions
const Projects = require('../projects/projects-model');
const Actions = require ('./actions-model');

function ensureActionIdExists(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if(action){
                req.existingAction = action;
                next();
            } else {
                res.status(404).json({
                    message: 'action not found at provided id'
                });  
                return;
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving action'
            });
        });
};

function validateAction(req, res, next) {
    const { project_id, completed, description, notes } = req.body;
    if(!project_id 
        || !description 
        || !notes
      )
    {
        res.status(400).json({
            message: 'project_id, description, and notes are required'
        });
        return;
    } else if(description.trim().length > 128) {
        res.status(400).json({
            message: 'description can only be 128 chars long'
        });
        return;
    } else { 
        Projects.get(project_id)
        .then(project => {
            if(!project){
                res.status(404).json({
                    message: 'cannot find project matching that project_id'
                });
                return;
            } else {
                req.action = { 
                    project_id, 
                    description, 
                    notes, 
                    completed: completed ? completed : false 
                };
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'cannot find project matching that project_id'});
        })
    }
    
};

module.exports = {
    ensureActionIdExists,
    validateAction,
}