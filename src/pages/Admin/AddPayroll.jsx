import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const AddPayroll = () => {
    const {user} = useSelector((state)=>state)
    // console.log(user.token)
    const [data ,setData] = useState([]);

    // console.log(payroll);
    // console.log(amount);

    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/allusers`,{headers:{"Authorization":user.token}})
            .then((res)=>{
            //   console.log(data);
              console.log(res.data);
              setData(res.data.user);
            })
        } 
        fetchUsers();
    }, [])
    // console.log(id)
    // console.log(amount,btn,status);
    // if(amount){
    //     setStatus('paid');
    //     setBtn(false);
    // }



  return (
    <Sidebar>
     <div className="container my-0 border border-3 py-5">
            <h1>Payroll</h1>
            <div className="row gap-4 d-flex justify-content-start flex-wrap px-4">
                {
                    data.map((i)=>(
                    <div className="card p-3 attendence-card text-center">
                        <div className="card-img ">
                            <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                            <div className="card-subtitle">{i.name} </div>
                        </div>
                        <div className="card-body">
                            <Link to={`/payroll/payment/${i._id}`} className='btn btn2' >Pay</Link>
                        </div>
                        <div className="card-footer">
                            <Link to={`/payroll/${i._id}`} className='btn btn-link' >View Attendence</Link>
                        </div>
                    </div>
                    ))
                }
            </div>

        </div>



    </Sidebar>
  )
}

export default AddPayroll