import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment'

const Projects = () => {
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
    <Sidebar>
      {
        loading? <div className="container">
        <h2>Projects</h2>
        <div className="row"> 
          {
            data.map((i)=>(
              <div className="col-lg-3 col-md-6 my-xs-3">
                  <div className="card px-0">
                    <div className="card-header project-header-bg  text-white">
                    <Link className='text-white text-decoration-none' to={`/project/${i._id}`}>{i.name}</Link>
                      </div>
                    <div className="card-body pl-2 pr-0" >
                      <div className="d-flex  justify-content-around ">
                        <p>{moment(i.startDate).format('YYYY-MM-DD')}</p>
                        <p>{moment(i.endDate).format('YYYY-MM-DD ')}</p>
                      </div>
                      <div className="card-body-row d-flex px-0">
                      <div className="card-body-row-01">
                      <div className="row">
                        <p>Status : {i.status}</p>
                      </div>
                      <div className=" d-flex flex-row gap-2 flex-wrap">
                      {
                        i.team.map((item)=>(
                          // <div className="card_img">
                            <img className='img-thumbnail rounded-5 project_team_card' src={item.profilePhoto}  alt="" />
                          // </div>
                        )
                        )
                      }
                      </div>
                      </div>
                      <div className="card-body-row-02 ml-4  ">
                      <div class="col-12 ">
                         <div class="progress light">
                              <span class="progress-left">
                                  <span class="progress-bar"></span>
                              </span>
                              <span class="progress-right">
                                  <span class="progress-bar"></span>
                              </span>
                              <div class="progress-value">75%</div>
                          </div>
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
            ))
          }

        </div>
      </div>
      :<h2>Loading...</h2>
      }
          
    </Sidebar>
  )
}

export default Projects