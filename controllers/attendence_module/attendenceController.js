import Attendence  from '../../models/users/attendenceSchema.js';

export const newAttendence = async (req, res) => {
    try {
        const newAttendence = new Attendence(req.body);
        await newAttendence.save();
        res.status(201).json({
            success: true,
            message: 'Attendence added successfully',
            newAttendence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAttendences = async (req, res) => {
    try {
        const attendences = await Attendence.find();
        res.status(200).json({
            success: true,
            message: 'Attendences fetched successfully',
            attendences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getSingleAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Attendence fetched successfully',
            attendence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const updateAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Attendence updated successfully',
            attendence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Attendence deleted successfully',
            attendence
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}