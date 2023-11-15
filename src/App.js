import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import AddEmployee from './pages/Employee/AddEmployee';
import Attendence from './pages/Employee/Attendence';
import Payroll from './pages/Employee/Payroll';
import AddAttendence from './pages/Admin/AddAttendence';
import AddPayroll from './pages/Admin/AddPayroll';
import { useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';
import Invoice from './pages/Admin/Invoice';
import PayEmp from './pages/Admin/PayEmp';
import InvoicePage from './pages/Admin/InvoicePage';
import AllInvoices from './pages/Admin/AllInvoices';
import Projects from './pages/Admin/Projects';
import Addproject from './pages/Admin/Addproject';
import ProjectsPage from './pages/Admin/ProjectsPage';
import Chats from './pages/Chats/Chats';
import socketIO from 'socket.io-client'


const ENDPOINT=process.env.REACT_APP_BACKEND_URL;
// const ENDPOINT='http://localhost:3001';

 
function App() {

  
  // const socket = socketIO(ENDPOINT,{tranports:['websocket']}) 
  // socket.on('connnect',()=>{
  //   alert('Connect');
  //   console.log('connected');
  // })

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/attendence' element={<AddAttendence/>}/>
          <Route path='/attendence/:id' element={<Attendence/>}/>
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/payroll' element={<AddPayroll/>}/>
          <Route path='/invoices' element={<AllInvoices/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
          <Route path='/invoice/:id' element={<InvoicePage/>}/>
          <Route path='/payroll/:id' element={<Payroll/>}/>
          <Route path='/payroll/payment/:id' element={<PayEmp/>}/>
          <Route path='/projects' element={<Addproject/>}/>
          <Route path='/project' element={<Projects/>}/>
          <Route path='/project/:id' element={<ProjectsPage />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          {/* <Route path='/register' element={<Register/>}/> */}
          <Route path='/employee' element={<AddEmployee/>}/>
        </Routes>

      </Router>

    </div>
  );
}



const Logout =()=> {

  const disptach=useDispatch()
  const navigate = useNavigate()
    disptach(logout());
    navigate('/login')
    console.log('logged Out')
    return(
    <Navigate to='/login'/>
    )
}

export default App;
