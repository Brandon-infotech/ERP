import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';


const ProjectsPage = () => {
  const {user } =useSelector(state=>state); 
  const [name,setName] = useState() 
  const [client,setClient] = useState() 
  const [start,setStart] = useState()
  const [end,setEnd] = useState()
  const [present,setPresent] = useState([])
  const [progress,setProgress] = useState(0);
  const [status, setStatus] = useState("Not Started");
  const [team,setTeam] =useState([]);
  const [employee,setEmployee] = useState([]);
  const [invoice,setInvoices]=useState([]);
  const [presentTeam,setPresentTeam] = useState([]);

  const [data, setData] = useState([]); 
  const [loading,setLoading]=useState(false);

  const {id} =useParams()
  // console.log(id);
  // let invoice=[];

  const fetchInvoice = async()=>{
       await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/invoice/allinvoices`,{headers:{"Authorization":user.token}})
      .then((res)=>{
        // console.log(res.data.invoices);
        setLoading(true);
        setData(res.data.invoices)
      })
  }
  useEffect(()=>{
    fetchInvoice();
    },[])




  const handleInvoice = (e)=>{
   let invoices=e.target.value;
  //  console.log(invoices);
  setInvoices((currentInvoice)=>{
      return [...currentInvoice,invoices]
     });
} ;
// console.log(allInvoices);


const handleBtn = (index)=>{
  // console.log(index);
  localArray[index]=!localArray[index];
  setPresent(localArray);
}

const localArray=[];
let localVarible=[];
const test=()=>{

  //  localVarible= Object.keys(present.filter((x)=>x==true))

  present.map((i,index)=>{
    console.log(i,index);
       if (i) {
        // console.log(index);
        localVarible.push(presentTeam[index]._id)
      }
  })
  return localVarible
}
    
  useEffect(()=>{
      const fetchUsers = async()=>{
           await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/projects/${id}`,{headers:{"Authorization":user.token}})
          .then((res)=>{
            // console.log(data);
            // console.log(res.data.project);
            setLoading(true);
            // setData(res.data.project)
            setClient(res.data.project.client)
            setTeam(res.data.project.team)
            setName(res.data.project.name)
            setStart(res.data.project.startDate)
            setEnd(res.data.project.endDate)
            setProgress(res.data.project.progress)
            setStatus(res.data.project.status)
            setInvoices(res.data.project.invoice)
          })
      }
      fetchUsers();
      },[])
    // console.log(data);


const handleProject =()=>{
  console.log(localVarible);
  const arr = test();
  console.log(arr);
axios
.put(
  `${process.env.REACT_APP_BACKEND_URL}api/projects/updateprojects/${id}`,
  {
      name:name,
      client:client,
      startDate:start,
      endDate:end,
      progress:progress,
      status:status,
  },{headers:{"Authorization":user.token}}
)
.then((res) => console.log(res.data))
.catch((error) => {
  console.log(error);
});
}

const updateProjectInvoices = () => {
  axios
  .put(
    `${process.env.REACT_APP_BACKEND_URL}api/projects/updateprojects/${id}`,
    {
        invoice:invoice        
    },{headers:{"Authorization":user.token}}
  )
  .then((res) =>{
      fetchInvoice()
     console.log(res.data)
    })
  .catch((error) => {
    console.log(error);
  });
}

const fetchProjectUsers = async()=>{
     await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/allprojectusers`,{team},{headers:{"Authorization":user.token}})
    .then((res)=>{
      // console.log(data);
      // console.log(res.data.user);
      setPresentTeam(res.data.user)
    })
}

// const removeTeamMember=()=>{
//   axios
//   .put(
//     `${process.env.REACT_APP_BACKEND_URL}api/projects/updateprojects/${id}`,
//     {
//         team:
//     },{headers:{"Authorization":user.token}}
//   )
//   .then((res) =>{
//       fetchInvoice()
//      console.log(res.data)
//     })
//   .catch((error) => {
//     console.log(error);
//   });
// }




return (
  <Sidebar>
    {
      loading ?(
        <div className="container my-0 border border-3 pt-5 ">
        <div className="heading w-100 p-2  mb-3 text-white rounded-2">Project's Details</div>
        <div className="d-flex flex-wrap">
        <div className="section-01 col-lg-6 col-sm-12">
        <label htmlFor="name">Project's Name</label>
        <input type="text" id='name' className='form-control input' placeholder={name} onChange={(e)=>setName(e.target.value)}   />
  
        <label htmlFor="name">Client's Name</label>
        <input type="text" id='name' className='form-control input' placeholder={client} onChange={(e)=>setClient(e.target.value)}/>
  
        <label htmlFor="phone">Start Date</label>
        <input type="text" id='phone' className='form-control input' placeholder={moment(start).format('YYYY-MM-DD ')}   />
  
        <label htmlFor="name">End Date</label>
        <input type="text" id='name' className='form-control input' placeholder={moment(end).format('YYYY-MM-DD ')}  />
  
   
        </div>
        <div className="section-01 col-lg-6 col-sm-12">
        <label htmlFor="name">Invoice</label>
        <select className='form-select input'>
          {
            invoice.map((i)=>(
              <option  value={i._id}>{i.client}/ ₹{i.amount} </option>
            ))
          }
        </select>
        <label htmlFor="name">Progress</label>
        <input type="number" id='name' className='form-control input' placeholder={progress} onChange={(e)=>setProgress(e.target.value)}  />
  
        <label htmlFor="name">Status</label>
        {/* <input type="number" id='name' className='form-control input' placeholder={status}  /> */}

        <select className='form-select input' value={status} onChange={(e)=>setStatus(e.target.value)} >
          <option value="In Progress">In Progress</option>
          <option value="Not Started" >Not Started</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="btn btn1 mt-4" data-bs-toggle="modal" data-bs-target="#invoiceModal">Add New Invoice</button>
        </div>
        </div>
        <div className="heading w-100 p-2  my-3 text-white"> Present Team </div>
        <div className="row gap-4 d-flex justify-content-start flex-wrap px-4 my-4">
                  {
                      team.map((i,index)=>{
                        localArray[index]=present[index] ?  present[index]:false;
                        return(
                        <div key={i._id} className="card p-3 attendence-card text-center">
                            <div className="card-img ">
                                <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                                <div className="card-subtitle">{i.name} </div>
                                <div className="card-subtitle">{i._id} </div>
                            </div>
                            <div className="card-body">
                            <button  onClick={()=>{
                                  handleBtn(index)}
                                  } className='btn btn2 '>{present[index] ? "Add Member" :  "Remove Member" }</button>
                            </div>
                            <div className="card-footer">
                                <Link to={`/team/${i._id}`} className='btn btn-link' >View Employee Details</Link>
                            </div>
                        </div>
                        )
                      })
                  }
              </div>
        <div className="col-12 collapse" id="collapseExample">
           <div className="heading w-100 p-2  my-3 text-white"> Add New Members </div>
           <div className="row gap-4 d-flex justify-content-start flex-wrap px-4 my-4">
           {
                      presentTeam.map((i,index)=>{
                        localArray[index]=present[index] ?  present[index]:false;
                        return(
                        <div key={i._id} className="card p-3 attendence-card text-center">
                            <div className="card-img ">
                                <img  className="img-thumbnail rounded-circle" src={i.profilePhoto} alt="...." />
                                <div className="card-subtitle">{i.name} </div>
                            </div>
                            <div className="card-body">
                            <button  onClick={()=>{
                                  handleBtn(index)}
                                  } className='btn btn2 '>{ present[index] ? "Remove Member" :  "Add Member" }</button>
                            </div>
                            <div className="card-footer">
                                <Link to={`/team/${i._id}`} className='btn btn-link' >View Employee Details</Link>
                            </div>
                        </div>
                        )
                      })
                  }
              </div>

        </div>
        <div className="col-12 text-center my-3">
          <button className="btn btn1 btns" onClick={handleProject}>Update Project</button>

          <button className="btn btn1 btns" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={fetchProjectUsers} >Add Members</button>
        </div>
        
      </div>


        
            
      ):<h2>Loading...</h2>
    }
 
<div>
  {/* Modal fro invoice */}
  <div className="modal fade" id="invoiceModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <label htmlFor="name">Invoice</label>
        <select className='form-select input' onChange={(e)=>handleInvoice(e)}>
          {
            data.map((i)=>(
              <option  value={i._id}>{i.client}/ ₹{i.amount} </option>
            ))
          }
        </select>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" data-bs-dismiss="modal" onClick={updateProjectInvoices} className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

  </Sidebar>
)
}

export default ProjectsPage