import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddAttendence = () => {
    const {user} = useSelector(state=>state)
    const [data ,setData] = useState([]);
    const [attendence, setAttendence] = useState();
    const [id, setId] = useState()

useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/allusers`,{headers:{"Authorization":user.token}})
            .then((res)=>{
            //   console.log(data);
              console.log(res.data.user);
              setData(res.data.user);
            })
        } 
        fetchUsers();
    }, [])



//  console.log(data);
//  console.log(attendence)
// console.log(id)

    const handleAttendence= (status,_id)=>{
        // e.preventDefault();
        // console.log(_id);
        // console.log(status);
        setAttendence(status)
        // setId(e.id)
        // console.log(id);
    // console.log(attendence);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/attendence/new`,
        {
          attendence:status,
          user:_id
        },{headers:{"Authorization":user.token}}
      ).then((res) =>{
        console.log(res.data)
    })
}

  return (
    <Sidebar>
        <div className="container my-0 border border-3 py-5">
            <h1>Attendence</h1>
            <div className="row gap-4 d-flex justify-content-start flex-wrap px-4">
            {
                    data.map((i)=>(
                    <div className="card p-3 col-lg-4  text-center" >
                        <div className="card-img">
                            <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                            <div className="card-subtitle">{i.name}</div>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <button onClick={()=>handleAttendence('absent',i._id)} className='btn btn2' value={"Absent"}>Absent</button>
                            <button onClick={()=>handleAttendence('present',i._id)} className='btn btn1' value={"Present"}>Present</button>
                            <button onClick={()=>handleAttendence('half-day',i._id)} className='btn btn2' value={"Present"}>Half Day</button>
                        </div>
                        <div className="card-footer">
                            <Link to={`/attendence/${i._id}`} className='btn btn-link'>View Attendence</Link>
                        </div>
                    </div>
                    ))
                }
            </div>
            {/* <div className="row d-flex align-item-end justify-content-start mx-5" >
                <button onClick={handleAttendence}  className='btn btn1 px-3  my-5' type="submit">Submit Attendence</button>
            </div> */}

        </div>
    </Sidebar>
  )
}

export default AddAttendence;