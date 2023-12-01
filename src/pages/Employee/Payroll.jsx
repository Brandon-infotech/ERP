import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Payroll = () => {
  const {user } =useSelector(state=>state); 
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  // let _id = user.id;
  const {id} = useParams()
  // const id='64e78524bfebce4adc751087';

  // console.log(id);
  
  useEffect(()=>{
    const fetchUsers = async()=>{
         await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/${id}`,{headers:{"Authorization":user.token}})
        .then((res)=>{
          // console.log(data);
          // console.log(res.data.user);
          setName(res.data.user.name)
          setEmail(res.data.user.email)
          setPosition(res.data.user.position)
          setPhone(res.data.user.phone)
        })
    }
    fetchUsers();
    },[])


    return (
      <Sidebar>
        <div className="container my-0 border border-3 pt-5 ">
        <div className="d-flex flex-wrap">
          <div className="section-01 col-lg-6 col-sm-12">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled
              placeholder={name}
              className="form-control input"
            />

            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="email"
              className="form-control input"
              disabled
              placeholder={email}
            />
          </div>

          <div className="section-01 col-lg-6 col-sm-12">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control input"
              disabled
              placeholder={phone}
            />

            <label htmlFor="name">Position </label>
            <input
              type="text"
              id="name"
              className="form-control input"
              disabled
              placeholder={position}
            />
          </div>
        </div>

          <div className="px-3 d-flex flex-row justify-content-between my-4 w-auto">
            <h2 className="salary">Salary Status for current month</h2>
            <div className="col-6">
            <button type="button" className="btn btns btn3">
              Paid
            </button>
            </div>
          </div> 
          <div className="table-responsive mx-2">
            
          <table className="table table-border">
              <thead>
                  <tr className='table-active '>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody >
                  <tr >
                      <td>content</td>
                      <td>content</td>
                      <td>content</td>
                  </tr>

              </tbody>
          </table>
          </div>
        </div>
      </Sidebar>
  )
}

export default Payroll