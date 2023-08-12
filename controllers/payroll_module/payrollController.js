import PayrollModel from '../../models/users/PayrollSchema.js'


export const generatePayroll = async (req, res) =>{
    try {
        const payroll = await new  PayrollModel(req.body).save();
        res.status(200).send({
            message: 'Payroll saved successfully',
            success: true,
            payroll
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
}


export const allPayrolls = async (req, res) => {
    try {
        const payroll = await PayrollModel.find();
        res.status(200).send({
            message: 'All Payrolls',
            success: true,
            payroll
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const updatePayroll = async(req, res) => {
    try {
        const payroll = await PayrollModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({
            success: true,
            message: 'Payroll updated successfully',
            payroll
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

export const deletePayroll =async (req, res) => {
    try {
        const payroll = await PayrollModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            message: 'Payroll deleted successfully',
            success: true,
            payroll
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


export const getSinglePayroll = async (req, res) =>{
    try {
        const payroll = await PayrollModel.findById(req.params.id);
        res.status(200).send({
            message: 'Get Single Payroll',
            success: true,
            payroll
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}