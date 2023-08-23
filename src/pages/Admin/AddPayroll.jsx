import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddPayroll = () => {
    const {user} = useSelector((state)=>state)
    console.log(user.token)
    const [payroll,setPayroll]=  useState();
    const [amount,setAmount]=  useState();
    const [data ,setData] = useState([]);
    // console.log(payroll);
    // console.log(amount);

    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/allusers`,{headers:{"Authorization":user.token}})
            .then((res)=>{
            //   console.log(data);
              console.log(res.data.user[0]);
              setData(res.data.user);
            })
        } 
        fetchUsers();
    }, [])


    const handleAmount = (e) => {
        e.preventDefault();
        console.log(amount);
        // console.log(e);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/payroll/new`,
            {
                // user:id,
              amount: amount,
            },
          ).then((res) =>{
            console.log(res.data)
           })
          .catch((error) => {
            console.log(error);
          });
       
      };

  return (
    <Sidebar>
     <div className="container my-0 border border-3 py-5">
            <h1>Payroll</h1>
            <div className="row gap-4 d-flex justify-content-start flex-wrap px-4">
                {
                    data.map((i)=>(
                    <div className="card p-3 attendence-card text-center" >
                        <div className="card-img ">
                            <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                            <div className="card-subtitle">{i.name} </div>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <button className='btn btn2' data-bs-toggle="modal" data-bs-target="#exampleModal" >Absent</button>
                            
                        </div>
                        <div className="card-footer">
                            <Link to={`/payroll/:${i._id}`} className='btn btn-link' >View Attendence</Link>
                        </div>
                    </div>
                    ))
                }
            </div>

        </div>





    {/* modal  */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Payroll</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body justify-content-start d-flex align-align-items-end">
                <form className="row g-3">
                <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" disabled  className="form-control" id="inputEmail4" />
                </div>
                <div className="col-12">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" disabled  className="form-control" id="inputPassword4" />
                </div>
                <div className="col-12">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" onChange={(e)=>setAmount(e.target.value)}  className="form-control" id="amount" />
                </div>
                </form>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" data-bs-dismiss="modal" onClick={handleAmount} className="btn btn-primary">Save changes</button>
            </div>
        </div>
        </div>
    </div>

    </Sidebar>
  )
}

export default AddPayroll