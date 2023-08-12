import  messageModel from '../../models/Chats/messageModel.js'


export const newMessage = async (req, res) => {
    try {
        const messages = await  new messageModel(req.body).save()
        res.status(200).json({
            success: true,
            message:"success",
            messages
        })
    } catch (error) {
        res.status(error).json({
            success: false,
            message: error.message
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await messageModel.find().populate({path:'sender', select: 'name '})
        res.status(200).json({
            success: true,
            message:"success",
            messages
        })
    } catch (error) {
        res.status(error).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteMessage = async (req, res) => {
    try {
        const messages = await messageModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message:"success",
            messages
        })
    } catch (error) {
        res.status(error).json({
            success: false,
            message: error.message
        })
    }
}

export const updateMessage = async (req, res) => {
    try {
        console.log(req.body);
        const messages = await messageModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json({
            success: true,
            message:"success",
            messages
        })
    } catch (error) {
        res.status(error).json({
            success: false,
            message: error.message
        })
    }
}