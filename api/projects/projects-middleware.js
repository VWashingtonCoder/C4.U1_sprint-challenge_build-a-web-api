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
                    message: 'Project not found'
                });
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
    const {name, description} = req.body; 
    if (!name || !description || name.trim() === '' || description.trim() === '') {
        res.status(400).json({
            message: 'name and description of project are required'
        });
        return;
    }
    
    req.validProject = { 
        name: req.body.name.trim(), 
        description: req.body.description.trim() 
    };
    next();
 }

 module.exports = {
     ensureProjectIdExists,
     validateProject
 };