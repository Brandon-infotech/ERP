import projectModel  from '../../models/project/ProjectSchema.js';

export const newProjectCtrl = async(req,res)=>{
    try {
        const project = new projectModel(req.body);
        await project.save();
        res.status(201).json({
            success: true,
            message: 'New Project created successfully',
            project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
   
}

export const allProjectsCtrl = async (req, res) => {
    try {
        const allProjects = await projectModel.find();
        res.status(200).json({
                    success: true,
                    message: 'All Projects fetched successfully',
                    allProjects
                });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const singleProjectCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectModel.findById(id)
        res.status(200).json({
                    success: true,
                    message: 'Single Project fetched successfully',
                    project
                });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProjectCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const {name,client,startDate,endDate,status,progress,team} = req.body
        // const project = await projectModel.findById(id)
        // console.log(project);
        const projects = await projectModel.findByIdAndUpdate(id,{
            name,client,startDate,endDate,status,progress,team
        })
        res.status(200).json({
                            success: true,
                            message: 'Project updated successfully',
                            project
                        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProjectCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectModel.findByIdAndDelete(id)
        res.status(200).json({
                            success: true,
                            message: 'Project deleted successfully',
                            project
                        });
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

