import Attendence  from '../../models/users/attendenceSchema.js';
import UserModel from '../../models/users/UserSchema.js';
import {BSON} from 'bson'

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
        console.log(req.params.id)
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


export const attendenceAnalytics = async (req, res) => {
    try {
        const id= req.params.id;
        const month=req.body.month
        console.log(req.body.month);
        var date = req.body.month ? new Date(req.body.month): new Date();
        let y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1,2);
        // console.log(firstDay);
        // console.log( lastDay);

        const employeeAttendence = await Attendence.aggregate([
          {  
            '$match': {
                user: new BSON.ObjectId(`${id}`) ,
                // attendence:'present',
                createdAt:{
                    $gt:firstDay,
                    $lt:lastDay
                },
             },
       
        },
   
          {  $group:{
                _id:{
                    user:"$user", 
                    attendence:"$attendence",                   
                },
                value:{
                    $push:"$attendence",
                },
                count:{
                    $count:{}
                }
            }},                 
        {
            $project: {
           _id: 0,
           attendence:1,
           count:1,
           value:1,
           userName: "$_id.user",
         },
      },
        ]);
        const populatedUserTotalPresent = await UserModel.populate(employeeAttendence, {
            path: "userName",
            select: "name email phone position", // Change to the actual field name in the User model,
          });  
        let total=0;

        let present=0;
        let absent=0;
        let half_day=0;
        employeeAttendence.map((i)=>{
            switch (i.value[0]) {
                case "present":
                    present = i.count;
                    break;
                case "absent":
                    absent = i.count;
                    break;
                case "half-day":
                    half_day = i.count
                    break;
            
                default:
                    break;
            }
        })
        console.log(present, absent,half_day);
        // console.log(total);
        // total=(total /total+absent)*100
        total= ((present +((half_day)/2)) /(present+absent+half_day))*100;
        res.status(200).json({
            success: true,
            message: 'Attendence found',
            employeeAttendence,
            total,
            month
            
        });
    } 
    

    
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}