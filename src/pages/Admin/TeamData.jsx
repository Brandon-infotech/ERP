import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const TeamData = () => {

    const {user } =useSelector(state=>state); 
    const [data, setData] = useState(); 
    const [loading,setLoading]=useState(false);
  
    const navigate = useNavigate();
  
    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/projects/allprojects`,{headers:{"Authorization":user.token}})
            .then((res)=>{
              console.log(res.data.allProjects);
              setLoading(true);
              setData(res.data.allProjects)
            })
        }
        fetchUsers();
        },[])
  return (
    <div>
        
    </div>
  )
}

export default TeamData