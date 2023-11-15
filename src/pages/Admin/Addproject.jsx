import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Addproject = () => {
    const {user } =useSelector(state=>state); 
    const [name,setName] = useState() 
    const [client,setClient] = useState() 
    const [start,setStart] = useState()
    const [end,setEnd] = useState()
    const [present,setPresent] = useState([])
    const [progress,setProgress] = useState(0);
    const [status, setStatus] = useState("Not Started");
    const [employee,setEmployee] = useState([]);
    const [invoice,setInvoices]=useState([]);

    const [data, setData] = useState(); 
    const [loading,setLoading]=useState(false);
    // let invoice=[];

    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/invoice/allinvoices`,{headers:{"Authorization":user.token}})
            .then((res)=>{
              // console.log(res.data.invoices);
              setLoading(true);
              setData(res.data.invoices)
            })
        }
        fetchUsers();
        },[])


    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/auth/allusers`,{headers:{"Authorization":user.token}})
            .then((res)=>{
              // console.log(data);
              // console.log(res.data.user);
              setEmployee(res.data.user)
            })
        }
        fetchUsers();
        },[])

    const handleInvoice = (e)=>{
     let invoices=e.target.value;
    setInvoices((currentInvoice)=>{
        return [...currentInvoice,invoices]
       })
  } ;

// console.log(team)

const handleBtn = (index)=>{
  console.log(index);
  localArray[index]=!localArray[index];
  setPresent(localArray);
}

const localArray=[];
const test=()=>{
  const localVarible=[];

  //  localVarible= Object.keys(present.filter((x)=>x==true))

  present.map((i,index)=>{
       if (i) {
        // handleTeam(employee[index]._id);
        localVarible.push(employee[index]._id)
      }
  })
  return localVarible
}

const handleProject =()=>{

  
  const arr =test()
  console.log(arr);

  axios
  .post(
    `${process.env.REACT_APP_BACKEND_URL}api/projects/newproject`,
    {
        name:name,
        client:client,
        startDate:start,
        endDate:end,
        team:arr,
        progress:progress,
        status:status,
        invoice:invoice        
    },{headers:{"Authorization":user.token}}
  )
  .then((res) => console.log(res.data))
  .catch((error) => {
    console.log(error);
  });
}

  return (
    <Sidebar>
      {
        loading ?(
          <div className="container my-0 border border-3 pt-5 ">
          <div className="heading w-100 p-2  mb-3 text-white rounded-2">Project's Details</div>
          <div className="d-flex flex-wrap">
          <div className="section-01 col-lg-6 col-sm-12">
          <label htmlFor="name">Project's Name</label>
          <input type="text" id='name' className='form-control input' onChange={(e)=>setName(e.target.value)} />
    
          <label htmlFor="name">Client's Name</label>
          <input type="text" id='name' className='form-control input' onChange={(e)=>setClient(e.target.value)} />
    
          <label htmlFor="phone">Start Date</label>
          <input type="date" id='phone' className='form-control input' onChange={(e)=>setStart(e.target.value)} />
    
          <label htmlFor="name">End Date</label>
          <input type="date" id='name' className='form-control input' onChange={(e)=>setEnd(e.target.value)} />
    
     
          </div>
    
          <div className="section-01 col-lg-6 col-sm-12">
          <label htmlFor="name">Invoice</label>
          <select className='form-select input' onChange={(e)=>handleInvoice(e)}>
            {
              data.map((i)=>(
                <option  value={i._id}>{i.client}/ ₹{i.amount} </option>
              ))
            }
          </select>
          <label htmlFor="name">Progress</label>
          <input type="number" id='name' className='form-control input' onChange={(e)=>setProgress(e.target.value)} />
    
          <label htmlFor="name">Status</label>
          <select className='form-select input' onChange={(e)=>setStatus(e.target.value)} >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          </div>
          </div>
          <div className="heading w-100 p-2  my-3 text-white">Team </div>
          <div className="row gap-4 d-flex justify-content-start flex-wrap px-4 my-4">
                    {
                        employee.map((i,index)=>{
                          localArray[index]=present[index] ?  present[index]:false;
                          return(

                        <div key={i._id} className="card p-3 attendence-card text-center">
                            <div className="card-img ">
                                <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                                <div className="card-subtitle">{i.name} </div>
                                {/* <div className="card-subtitle">{i._id }:{index} </div> */}
                            </div>
                            <div className="card-body">
                                <button  onClick={()=>{
                                handleBtn(index)}
                                } className='btn btn2 '>{ present[index] ? "Remove Member" :  "Add Member" }</button>
                                {/* <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"/>
                                  <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label> */}
                            </div>
                            <div className="card-footer">
                                <Link to={`/team/${i._id}`} className='btn btn-link' >View Employee Details</Link>
                            </div>
                        </div>
                        )})
                    }
                </div>
          <div className="col-12 text-center my-3">
            <button className="btn btn1 btns" onClick={()=>{ handleProject() }}>Create Project</button>
          </div>
        </div>
        ):<h2>Loading...</h2>
      }
   

    </Sidebar>
  )
}

export default Addproject