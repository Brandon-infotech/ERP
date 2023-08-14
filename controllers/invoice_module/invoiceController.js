import Invoice from '../../models/users/InvoiceSchema.js'

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate({ path: 'user', select: 'name email address'});
        res.status(200).json({
            success: true,
            message:'All Invoices',
            invoices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const generateInvoice = async (req, res) => {
    try {
        // console.log(req.body);
        const invoices = await new  Invoice(req.body).save();
        res.status(200).json({
            success: true,
            message:'Invoice Created',
            invoices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSingleInvoice = async (req, res) => {
    try {
    const invoices = await Invoice.findById(req.params.id).populate({ path: 'user', select: 'name email address'});
        res.status(200).json({
            success: true,
            message:'Single Invoice',
            invoices
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

export const updateInvoice = async (req, res) => {
    try {
        const invoices = await Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            message:'Invoice Updated Successfully',
            invoices
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteInvoice = async (req, res) => {
    try {
        const invoices = await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message:'Invoice Deleted Successfully',
            invoices
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}