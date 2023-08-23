import React from 'react'
import './sidebar.css'
import {MdOutlinePeopleAlt,MdDashboard} from 'react-icons/md'
import {BsFillChatLeftTextFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineProject} from 'react-icons/ai'
import {RiTeamLine} from 'react-icons/ri'
import {LiaFileInvoiceSolid} from 'react-icons/lia'
import logo from '../resources/Assets/Brandon-01.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import Extra from './Extra'



const Sidebar = (props) => {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state)
  // console.log(user);
  const dispatch = useDispatch()
  // console.log(user.name);

  const logoutfunc=()=>{
    console.log("Logged out");
    dispatch(logout());
    navigate('/login')
  }
  return (
    <>
   <div className="sidebar">
   <div className="header mb-5 w-100">
   <div className=" px-4 d-flex justify-content-end py-2">
    <div className="profile d-flex align-items-center ">          
      <img id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" decoding="async" loading="lazy"  src={user.photo} alt="..." width={50} height={50} className="rounded-circle img-thumbnail " />

      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item">Logout</li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
          </ul>
    </div>
  </div>
   </div>
  <div className="vertical-nav " id="sidebar">
  <div className="pt-2 pb-5 px-1 ">
    <div className="media d-flex align-items-center" data-bs-toggle="tooltip" data-bs-placement="top" title="Brandon">
      <img decoding="async" loading="lazy"  src={logo} alt="..."  className=" " />
  </div>
  </div>

  <ul className="nav flex-column  mb-0">
    <li className="nav-item text-center">
      <Extra title='Dashboard' url='/' >
      <MdDashboard color={'#fff'} size={25}/>
      </Extra>
    </li>
    <li className="nav-item">
    <Extra title='Community' url='/community' >
        <MdOutlinePeopleAlt color={'#fff'} size={30}/>
      </Extra>
    </li>
    <li className="nav-item">
    <Extra title='Chats' url='/team/payroll' >
        <BsFillChatLeftTextFill color={'#fff'} size={25}/>
      </Extra>
     
    </li>
    <li className="nav-item">
    <Extra title='Projects' url='/team/attendence' >
        <AiOutlineProject color={'#fff'} size={25}/>
      </Extra>
    </li>
  {/* <div className="separator"></div> */}
    <li className="nav-item">
    <Extra title='Team' url='/team/employee' >
        <RiTeamLine color={'#fff'} size={25}/>
      </Extra>
    </li>
    <li className="nav-item">
    <Extra title='Invoice' url='/invoices' >
        <LiaFileInvoiceSolid color={'#fff'} size={25}/>
      </Extra>
    </li>
    <li className="nav-item ">
    <Extra title='Logout' onClick={logoutfunc}>
        <FiLogOut color={'#fff'} size={25}/>
      </Extra>
    </li>
    </ul>

</div>

    </div>
   <div className="page-content p-5 " id="content" >
      {props.children}
    </div>

    </>
  )
};

export default Sidebar






