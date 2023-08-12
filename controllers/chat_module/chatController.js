import chatModel from "../../models/Chats/chatModel.js";



export const newChat = async (req, res) => {
    try {
        const chat = await new chatModel(req.body).save();
        res.status(200).json({
            success: true,
            message: "Chat Created Successfully",
            chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getChats = async (req, res) => {
    try {
        const Chat = await chatModel.find().populate({path:'users', select: 'name '}).populate({path:'groupAdmin', select: 'name '})
        res.status(200).json({
            success: true,
            message: "Chat List",
            Chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteChat = async (req, res) => {
    try {
        const chat = await chatModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Chat Deleted Successfully",
            chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateChat = async (req, res) => {
    try {
        console.log(req.body);
        const chat = await chatModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json({
            success: true,
            message: "Chat Updated Successfully",
            chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


