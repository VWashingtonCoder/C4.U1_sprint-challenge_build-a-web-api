// add middlewares here related to projects
 const Projects = require('./projects-model');

 function ensureProjectIdExists(req, res, next) {
     Projects.get(req.params.id)
        .then(project => {
            if (project){
                req.existingProject = project;
                next();
            } else {
                res.status(404).json({
                    message: 'Project not found at provided id'
                });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving project'
            })
        })
 }

 function validateProject(req, res, next) { 
    console.log(req.body)
    if(!req.body.name || !req.body.description || typeof req.body.completed !== 'boolean') {
        res.status(400).json({
            message: 'name, description and completed status of project are required'
        });
        return;    
    } else {
        req.validProject = { 
            name: req.body.name.trim(), 
            description: req.body.description.trim(),
            completed: req.body.completed
        };
        next();
    }
 }

 module.exports = {
     ensureProjectIdExists,
     validateProject
 };