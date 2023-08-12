import bankModel from  '../../models/users/BankDetailsSchema.js';

export const addAccount = async (req, res) => {
    try {
        const account = await new  bankModel(req.body).save();
        res.status(201).json({
            success: true,
            message: 'Account Created Successfully',
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllAccounts = async (req, res) => {
    try {
        const account = await bankModel.find();
        res.status(200).json({
            success: true,
            message: 'Accounts Retrieved Successfully',
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSingleAccount = async (req, res) => {
    try {
        const account = await bankModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Account Retrieved Successfully',
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateAccount = async(req, res) => {
    try {
        // console.log(req.params.id);
        const account = await bankModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: 'Account Updated Successfully',
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

export const deleteAccount = async(req, res) => {
    try {
        // console.log(req.params.id);
        const account = await bankModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Account Deleted Successfully',
            account
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}