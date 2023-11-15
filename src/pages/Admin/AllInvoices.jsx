import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {FcOpenedFolder}  from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';



const AllInvoices = () => {
    const {user } =useSelector(state=>state);
    const [data, setData] = useState(); 
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/invoice/allinvoices`,{headers:{"Authorization":user.token}})
            .then((res)=>{
              console.log(res.data.invoices);
              setLoading(true);
              setData(res.data.invoices)
            })
        }
        fetchUsers();
        },[])

  return (
  
    <Sidebar>
          {
        loading ?( <div className="container">
        <div className="responsive-table">
            <table className="table border ">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((i)=>(
                            <tr>
                            <td>{i.createdAt}</td>
                            <td>{i.client}</td>
                            <td> ₹ {i.amount}</td>
                            <td onClick={()=>navigate(`/invoice/${i._id}`)}><FcOpenedFolder/></td>
                            </tr>
                        ))
                    
                    }
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
    :(
        <h2>Loading...</h2>
  )
    }
        
    </Sidebar>
  )
}

export default AllInvoices