import React from 'react'
import './sidebar.css'
import {MdOutlinePeopleAlt,MdDashboard} from 'react-icons/md'
import {BsFillChatLeftTextFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineProject} from 'react-icons/ai';
import {RiTeamLine} from 'react-icons/ri';
import {LiaFileInvoiceSolid} from 'react-icons/lia';
import logo from '../resources/Assets/Brandon-01.png';
import {useSelector } from 'react-redux';
import Extra from './Extra';
import { Link } from 'react-router-dom'



const Sidebar = (props) => {
  const {user} = useSelector((state)=>state)
  // console.log(user);
  // console.log(user.name);

  return (
    <>
   <div className="sidebar">
   <div className="header mb-5 w-100">
   <div className=" px-4 d-flex justify-content-end py-2">
    <div className="profile d-flex align-items-center ">          
      <img id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" decoding="async" loading="lazy"  src={user.photo} alt="..." width={50} height={50} className="rounded-circle img-thumbnail" />

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
    <Extra title='Chats' url='/chats' >
        <BsFillChatLeftTextFill color={'#fff'} size={25}/>
      </Extra>
     
    </li>
    <li className="nav-item">
    <Extra title='Projects' url='/projects' >
        <AiOutlineProject color={'#fff'} size={25}/>
      </Extra>
    </li>
  {/* <div className="separator"></div> */}
    <li className="nav-item">
    <Extra title='Team' url='/employee' >
        <RiTeamLine color={'#fff'} size={25}/>
      </Extra>
    </li>
    <li className="nav-item">
    <Extra title='Invoice' url='/invoices' >
        <LiaFileInvoiceSolid color={'#fff'} size={25}/>
      </Extra>
    </li>
    <li className="nav-item " data-bs-toggle="modal" data-bs-target="#exampleModal">
    <Extra title='Logout' >
        <FiLogOut color={'#fff'} size={25}/>
      </Extra>
    </li>
    </ul>

</div>


    </div>
   <div className="page-content p-5 " id="content" >
      {props.children}
    </div>

  <div>
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
         <h3>Do you want to logout ?</h3>
        </div>
        <div className="modal-footer d-flex justify-content-around">
          <button type="button"  className="btn btn2" data-bs-dismiss="modal">Stay Logged In</button>
          <Extra  url='/logout' >
          <button type="button"  data-bs-dismiss="modal" className="btn btn-primary">
            Log Out
            </button>
          </Extra>
          {/* <Link to={'/login'} type="button" className="btn link">Login</Link> */}
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
};

export default Sidebar






