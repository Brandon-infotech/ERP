import addressModel from '../../models/users/AddressSchema.js'


export const newAddressCtrl =async(req, res) => {
try {
    const address= await new  addressModel(req.body).save();
    res.status(200).json({
        success: true,
        message: 'Address Created Successfully',
        address
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
}
}


export const updateAddressCtrl = async(req, res) => {
    try {
            const address = await addressModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json({
                success: true,
                message: 'Address Updated Successfully',
                address
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
}


export const deleteAddressCtrl = async(req, res) => {
    try {
        const address = await addressModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
                    success: true,
                    message: 'Address Deleted Successfully',
                    address
                });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllAddressCtrl = async(req, res) => {
    try {
        const address = await addressModel.find().populate({path:'user',select:'name'});
        res.status(200).json({
            success: true,
            message: 'Address Retrieved Successfully',
            address
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
       
}