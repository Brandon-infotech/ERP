import TimeSheet from "../../models/users/timesheetSchema.js"

export const getTimesheet = async (req, res) => {
    try {
        const timesheet = await TimeSheet.findOne( req.params.id).populate({path: 'user', select: 'name email phone'})
        res.status(200).json({
            success: true,
            message:"Success",
            timesheet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const generateTimesheet = async (req, res) => {
    try {
        const timesheet = await new TimeSheet(req.body).save();
        res.status(200).json({
            success: true,
            message:"Success",
            timesheet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const updateTimesheet = async (req, res) => {
    try {
        const timesheet = await TimeSheet.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            success: true,
            message:"Success",
            timesheet
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteTimesheet = async (req, res) => {
    try {
        const timesheet = await TimeSheet.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message:"Success",
            timesheet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

