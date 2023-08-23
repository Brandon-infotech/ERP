import express from "express";
import dotenv  from 'dotenv'
import connectDB from "./config/dbCon.js";
import cors from 'cors'
import authRoutes from './routes/utils/AuthRoutes.js';
import projectRoutes from './routes/project_module/projectRoutes.js';
import addressRoutes from './routes/address_module/addressRoutes.js';
import bankRoutes from './routes/bank_module/bankRoutes.js';
import payrollRoutes from './routes/payroll_module/payrollRoutes.js';
import invoiceRoutes from './routes/invoice_module/invoiceRoutes.js';
import attendenceRoutes from './routes/attendence_module/attendenceRoutes.js';
import messageRoutes from './routes/chat_module/messageRoutes.js';
import chatRoutes from './routes/chat_module/chatRoutes.js';
import timesheetRoutes from './routes/timesheet_module/timesheetRoutes.js';


//config env
dotenv.config()

// rest objects
const app = express();

// database config 
connectDB();


// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
// app.use(cors());
const corsOptions ={
  origin:['http://localhost:3000'], 
  // credentials:true,            //access-control-allow-credentials:true
  optionsSuccessStatus:200,
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

}
app.use(cors(corsOptions));
app.options('*',cors(corsOptions))

// routes.app
// router.get('/',(req,res)=>{
//   console.log("Hello");
//   res.send('Hello world!');
// })
app.use('/api/auth',authRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/bank',bankRoutes);
app.use('/api/payroll',payrollRoutes);
app.use('/api/invoice',invoiceRoutes);
app.use('/api/attendence',attendenceRoutes);
app.use('/api/chats',chatRoutes);
app.use('/api/chats/messages',messageRoutes);
app.use('/api/timesheet',timesheetRoutes);



//PORT 
const PORT = process.env.PORT || 3001;

//server running 
app.listen(PORT,()=>{
  console.log(`Server is running at port ${PORT}`);
})