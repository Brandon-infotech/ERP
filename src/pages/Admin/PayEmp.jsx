import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PayEmp = () => {
  const {user } =useSelector(state=>state); 
  const [data1,setData1] = useState();
  const [data2,setData2] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [curStatus, setCurStatus] = useState(true);
  const [status,setStatus] = useState('pending')

  const [line1, setLine1] = useState();
  const [line2, setLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();

  const [accName, setAccName] = useState();
  const [ifsc, setIfsc] = useState();
  const [upi, setUpi] = useState();
  const [bankname, setBankname] = useState();
  const [accNum, setAccNum] = useState();
  const [branchname, setBranchname] = useState();
  const [btn,setBtn] = useState(true)
  const [amount,setAmount]=  useState();




  const {id} = useParams();
    // const id='64e78524bfebce4adc751087';


  // const handleData =(e,editor)=>{
  //     setData1(editor.getData())
  //   }
    
  useEffect(()=>{
    const fetchUsers = async()=>{
         await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/${id}`,{headers:{"Authorization":user.token}})
        .then((res)=>{
          // console.log(data);
          // console.log(res.data.user.bankDetails);
          setName(res.data.user.name)
          setEmail(res.data.user.email)
          setPosition(res.data.user.position)
          setPhone(res.data.user.phone)
          setCurStatus(res.data.user.status? "Active" : "Fired")
          

          setCity(res.data.user.address.city)
          setLine1(res.data.user.address.line1)
          setLine2(res.data.user.address.line2)
          setZip(res.data.user.address.zip)
          setState(res.data.user.address.state)
          setCountry(res.data.user.address.country)


          setBranchname(res.data.user.bankDetails.branchName)
          setBankname(res.data.user.bankDetails.bankName)
          setAccName(res.data.user.bankDetails.holderName)
          setIfsc(res.data.user.bankDetails.ifsc)
          setUpi(res.data.user.bankDetails.upiId)
          setAccNum(res.data.user.bankDetails.accNumber)


        })
    }
    fetchUsers();
    },[])
  
    const handleAmount = (e) => {
      e.preventDefault();
      // console.log(e);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}api/payroll/new/${id}`,
          {
              user:id,
            amount: amount,
            status: status
          },{headers:{"Authorization":user.token}}
        ).then((res) =>{
          console.log(res.data)
         })
        .catch((error) => {
          console.log(error);
        });
     
    }

    console.log(data1);
  return (
    <Sidebar>
    <div className="container my-0 border border-3 pt-5 ">
      <div className="heading w-100 p-2  mb-3 text-white">Employee's Personal Details</div>
      <div className="d-flex flex-wrap">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Name</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={name} />

      <label htmlFor="name">Email</label>
      <input disabled type="text" id='email' className='form-control input' placeholder={email} />

      <label htmlFor="phone">Phone Number</label>
      <input disabled type="tel" id='phone' className='form-control input' placeholder={phone} />

      </div>

      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Position </label>
      <input disabled type="text" id='name' className='form-control input' placeholder={position} />

      <label htmlFor="name"> Status</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={curStatus} />

      </div>

      </div>
      <div className="heading w-100 p-2 mt-5 mb-3 text-white">Other Details</div>
      <div className="row">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Line 1</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={line1}  />

      <label htmlFor="name">Line 2</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={line2}  />

      <label htmlFor="name">City</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={city}  />

      </div>
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">State</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={state}  />

      <label htmlFor="name">Zip</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={zip}  />

      <label htmlFor="name">Country</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={country}  />
      </div>

      </div>
      <div className="heading w-100 p-2 mt-5 mb-3 text-white">Bank Details</div>
      <div className="d-flex flex-wrap ">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Account Holder's Name</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={accName}  />

      <label htmlFor="name">IfSC Code</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={ifsc}  />

      <label htmlFor="name">UPI ID</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={upi}  />

      </div>

     

      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Bank Name</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={bankname}  />

      <label htmlFor="name">Branch Name</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={branchname}  />

      <label htmlFor="name">Account Number</label>
      <input disabled type="text" id='name' className='form-control input' placeholder={accNum}  />

    
      </div>

      </div>

      <div className="heading w-100 p-2 mt-5 mb-3 text-white">Pay Now</div>
      <div className="d-flex flex-wrap ">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Amount</label>
      <input  type="number" id='name' className='form-control input' onChange={(e)=>{
                            setBtn(e.target.value  ? false : true)
                            setAmount(e.target.value)
                            setStatus(e.target.value ? "paid" :"pending")
                            }} placeholder='Enter the amount to be paid'  />
      </div>

     

      </div>



      <div className=" d-flex flex-row justify-content-around my-4 w-auto">
      <button type="button"  disabled={btn} onClick={handleAmount} className="btns btn btn1 ">
        Pay</button>
      <button type="button" className="btn btns btn2 ">Discard</button>
      </div>
    </div>

    </Sidebar>
  )
}

export default PayEmp