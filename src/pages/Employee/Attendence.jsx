import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Attendence = () => {
  const [month , setMonth] = useState()
  const {user } =useSelector(state=>state); 
  const [present, setPresent] = useState();
  const [absent, setAbsent] = useState();
  const [half_day, setHalf_day] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [total,setTotal] = useState();
  // console.log(user.token);
  // let _id = user.id;
  const {id} = useParams();
  // console.log(id);

//   useEffect(()=>{
//     const fetchUsers = async()=>{
//          await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/${id}`,{headers:{"Authorization":user.token}})
//         .then((res)=>{
//           // console.log(data);
//           // console.log(res.data.user);
//           setName(res.data.user.name)
//           setEmail(res.data.user.email)
//           setPosition(res.data.user.position)
//           setPhone(res.data.user.phone)
//         })
//     }
//     fetchUsers();
// },[])


  const fetchUsers = async(month)=> {
    const letFilter= month ? {month:month}:{}
       await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/attendence/${id}`,
        letFilter,
        {headers:{"Authorization":user.token}})
      .then((res)=>{
        console.log(res.data);
        console.log(res?.data?.total);
        // setData(res.data)

        setName(res.data?.employeeAttendence[0]?.userName?.name?res.data.employeeAttendence[0].userName.name:name)
        setEmail(res.data?.employeeAttendence[0]?.userName?.email?res.data.employeeAttendence[0].userName.email:email)
        setPhone(res.data?.employeeAttendence[0]?.userName?.phone?res.data.employeeAttendence[0].userName.phone:phone)
        setPosition(res.data?.employeeAttendence[0]?.userName?.position?res.data.employeeAttendence[0].userName.position:position)
        setPresent(res.data?.employeeAttendence[2]?.count? res.data.employeeAttendence[2].count:0)
        setAbsent(res.data?.employeeAttendence[0]?.count? res.data.employeeAttendence[0].count:0)
        setHalf_day(res.data?.employeeAttendence[1]?.count? res.data.employeeAttendence[1].count:0)
        setTotal(res.data?.total?res.data.total:0)
      })
  }

  useEffect(()=>{
    fetchUsers();
  },[])


// console.log(month);

// console.log(data.total)
// console.log(half_day)



  return (
    <Sidebar>

      <div className="container my-0 border border-3 pt-5 ">
        <div className="d-flex flex-wrap">
          <div className="section-01 col-lg-6 col-sm-12 ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled
              placeholder={name}
              className="form-control input mb-3"
            />

            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="email"
              className="form-control input  mb-3"
              disabled
              placeholder={email}
            />
          </div>

          <div className="section-01 col-lg-6 col-sm-12">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control input  mb-3"
              disabled
              placeholder={phone}
            />

            <label htmlFor="name">Position </label>
            <input
              type="text"
              id="name"
              className="form-control input  mb-3"
              disabled
              placeholder={position}
            />
          </div>
        </div>

        
        <div className="col my-4 px-3 d-flex justify-content-between align-items-center">
                <h3 className="d-inline">Attendance</h3>
                <div className="col-lg-6  justify-content-end d-flex">
                <input className="form-control py-1" type="date" onChange={(e)=>setMonth(e.target.value)} />
                <button className="btn btn1" htmlFor="months" onClick={()=>fetchUsers(month)}>Filter By Months</button>
                </div>
        </div>
        <div className="gap-5 px-3 mb-5 d-flex flex-wrap justidy-content-between align-items-center">
          <div className="box box-1 text-center">
            <h2 className="number">{present} </h2>
            <h4 className="attendence">Present</h4>
          </div>
          <div className="box box-2 text-center">
            <h2 className="number">{absent}</h2>
            <h4 className="attendence">Absent</h4>
          </div>
          <div className="box box-3  text-center">
            <h2 className="number">{half_day}</h2>
            <h4 className="attendence">Half Day</h4>
          </div>
          <div className="box box-4  text-center">
            <h2 className="number">{total}%</h2>
            <h4 className="attendence">Attendance %</h4>
          </div>
        </div>
        {/* <div className="row my-3 mx-2">
          <button className="btn btn3"> Previous months attendence</button>
        </div> */}
            {/* {
              data.map((i)=>( */}
        {/* <div className="table-responsive my-5 px-2">
        <table className="table table-border">
            <thead>
                <tr className="table-active">
                    <th>heading</th>
                    <th>heading</th>
                    <th>heading</th>
                    <th>heading</th>
                </tr>
            </thead>
            <tbody >
                <tr >
                    <td>{}</td>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                    <td>content</td>
                </tr>
            </tbody>
        </table>
        </div> */}
              {/* ))
            }  */}
      </div>
    </Sidebar>
  );
};

export default Attendence;
