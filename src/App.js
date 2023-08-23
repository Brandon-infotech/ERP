import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AddEmployee from './pages/Employee/AddEmployee';
import Attendence from './pages/Employee/Attendence';
import Payroll from './pages/Employee/Payroll';
import AddAttendence from './pages/Admin/AddAttendence';
import AddPayroll from './pages/Admin/AddPayroll';
import Extra from './components/Extra';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/attendence' element={<AddAttendence/>}/>
          <Route path='/attendence/:id' element={<Attendence/>}/>
          <Route path='/payroll' element={<AddPayroll/>}/>
          {/* <Route path='/team/attendence' element={<Attendence/>}/> */}
          <Route path='/team/payroll' element={<Payroll/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* <Route path='/register' element={<Register/>}/> */}
          <Route path='/team/employee' element={<AddEmployee/>}/>
        </Routes>

      </Router>


    </div>
  );
}

export default App;
