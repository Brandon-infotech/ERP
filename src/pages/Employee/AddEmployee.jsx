import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import './employee.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { register } from '../../redux/userSlice'
import {useDispatch} from 'react-redux'


const AddEmployee = () => {
  const [name,setName] = useState("") 
  const [phone,setPhone] = useState() 
  const [idphoto,setIdphoto] = useState() 
  const [dob,setDob] = useState() 
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [position, setPosition] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState(true);
  const [role, setRole] = useState(1);

  const [line1, setLine1] = useState();
  const [line2, setLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();

  const [accName, setAccName] = useState();
  const [ifsc, setifsc] = useState();
  const [upi, setupi] = useState();
  const [bankname, setBankname] = useState();
  const [accnumber, setAccnumber] = useState();
  const [branchname, setBranchname] = useState();
  const [address, setAddress] = useState();
  const [bank, setBank] = useState();
  const navigate = useNavigate()


  const {user } =useSelector(state=>state); 
  const dispatch = useDispatch()
  // console.log(user.token);
  // console.log(idphoto);
  


  const idPhotoSelect = async (event) => {
    let img = await event.target.files[0];
    console.log(img);

    const data = await new FormData();
    await data.append("file",img);
    await data.append("api_secret", "3pOPfy2U83PMYrggH2dLTM3pxNs");
    await data.append("api_key", "876323155953946");
    await data.append("upload_preset", "umq903p2");
    await data.append("cloud_name", "dawkdouvj");
    // console.log(data);

    await fetch("https://api.cloudinary.com/v1_1/dawkdouvj/image/upload", {
      method: "post",
      body: data})
      .then(res=>res.json())
      .then((data)=>{
        setIdphoto(data.url)
        // setBtn(false);
        // console.log(data.url);
      })
      .catch((error) => {
            console.log(error);
          });
     
    }
  const profilePhotoSelect = async (event) => {
    let img = await event.target.files[0];
    console.log(img);

    const data = await new FormData();
    await data.append("file",img);
    await data.append("api_secret", "3pOPfy2U83PMYrggH2dLTM3pxNs");
    await data.append("api_key", "876323155953946");
    await data.append("upload_preset", "umq903p2");
    await data.append("cloud_name", "dawkdouvj");
    // console.log(data);

    await fetch("https://api.cloudinary.com/v1_1/dawkdouvj/image/upload", {
      method: "post",
      body: data
    })
      .then(res=>res.json())
      .then((data)=>{
        setPhoto(data.url)
        // setBtn(false);
        // console.log(data.url);
      })
      .catch((error) => {
            console.log(error);
          });
     
    }


  const handleData = (e) => {

    e.preventDefault();
    console.log( line1,line2,state,country,city,zip);
    console.log( bankname,branchname,accName,ifsc,upi,accnumber);
    console.log(name,idphoto,photo);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/address/newaddress`,
        {
          line1,line2,state,country,city,zip
        },{headers:{"Authorization":user.token}}
      ).then((res) =>{
        console.log(res.data);
        setAddress(res.data.id);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/bank/newaccount`,
        {
          bankName:bankname,
          branchName:branchname,
          holderName:accName,
          ifsc:ifsc,
          upiId:upi,
          accNumber:accnumber,
        },{headers:{"Authorization":user.token}}
        ).then((res)=>{
          console.log(res.data);
          setBank(res.data.id);
          axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/register`,
          {
            name:name,
            email:email,
            profilePhoto:photo,
            IdPhoto:idphoto,
            position:position,
            password:password,
            status:status,
            address:address,
            bankDetails:bank,
            dob:dob,
            phone:phone,
            role:role,

          }).then((res)=>{
            console.log(res.data);
            dispatch(
              register({
                name:res.data.name,
                role:res.data.role,
                token:res.data.token,
                id:res.data.id,
                photo:res.data.profilePhoto
              })
            )
          })

        })
        navigate('/')
       })
      .catch((error) => {
        console.log(error);
      });
   
  };
  
  return (
    <Sidebar>
    <div className="container my-0 border border-3 pt-5 ">
      <div className="heading w-100 p-2  mb-3 text-white">Employee's Personal Details</div>
      <div className="d-flex flex-wrap">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Name</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setName(e.target.value)} />

      <label htmlFor="name">Email</label>
      <input type="text" id='email' className='form-control input' onChange={(e)=>setEmail(e.target.value)} />

      <label htmlFor="phone">Phone Number</label>
      <input type="tel" id='phone' className='form-control input' onChange={(e)=>setPhone(e.target.value)} />

      <label htmlFor="name">Position </label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setPosition(e.target.value)} />

      <label htmlFor="name">Password</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setPassword(e.target.value)} />
      </div>

      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Verification Id's Photo</label>
      <input type="file" id='name' className='form-control input' onChange={idPhotoSelect} />

      <label htmlFor="name">Date Of Birth</label>
      <input type="date" id='name' className='form-control input' onChange={(e)=>setDob(e.target.value)} />

      <label htmlFor="name">Profile Photo</label>
      <input type="file" id='name' className='form-control input' onChange={profilePhotoSelect} />

      <label htmlFor="name">Status</label>
      <select className='form-select input' onChange={(e)=>setStatus(e.target.value)} >
        <option value="true">Active</option>
        <option value="false">Fired</option>
      </select>

      <label htmlFor="role">Role</label>
      <select className='form-select input' onChange={(e)=>setRole(e.target.value)} >
        <option value="1">Admin</option>
        <option value="2">Employee</option>
        <option value="3">Client</option>
      </select>

      </div>

      </div>
      <div className="heading w-100 p-2 mt-5 mb-3 text-white">Other Details</div>
      <div className="row">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Line 1</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setLine1(e.target.value)}  />

      <label htmlFor="name">Line 2</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setLine2(e.target.value)}  />

      <label htmlFor="name">City</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setCity(e.target.value)}  />

      </div>
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">State</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setState(e.target.value)}  />

      <label htmlFor="name">Zip</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setZip(e.target.value)}  />

      <label htmlFor="name">Country</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setCountry(e.target.value)}  />
      </div>

      </div>
      <div className="heading w-100 p-2 mt-5 mb-3 text-white">Bank Details</div>
      <div className="d-flex flex-wrap ">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Account Holder's Name</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setAccName(e.target.value)}  />

      <label htmlFor="name">IfSC Code</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setifsc(e.target.value)}  />

      <label htmlFor="name">UPI ID</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setupi(e.target.value)}  />

      </div>

     

      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Bank Name</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setBankname(e.target.value)}  />

      <label htmlFor="name">Branch Name</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setBranchname(e.target.value)}  />

      <label htmlFor="name">Account Number</label>
      <input type="text" id='name' className='form-control input' onChange={(e)=>setAccnumber(e.target.value)}  />

    
      </div>

      </div>
      <div className=" d-flex flex-row justify-content-around my-4 w-auto">
      <button type="button" onClick={handleData} className="btns btn btn1 ">Add Details</button>
      <button type="button" className="btn btns btn2 ">Discard</button>
      </div>
    </div>

    </Sidebar>
  )
}

export default AddEmployee