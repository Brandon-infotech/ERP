import React, { useState } from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { login } from "../../redux/userSlice";



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleData = (e) => {
    e.preventDefault();
    console.log(email, password);
    // console.log(e);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/login`,
        {
          "email": email,
          "password": password,
        },
      ).then((res) =>{
        console.log(res.data)
        if (res.data.role===1) {
          navigate('/')
        }else{
          navigate('/admin')
        }
        dispatch(
          login({
            name:res.data.name,
            role:res.data.role,
            token:res.data.token,
            id:res.data.id,
            photo:res.data.profilePhoto
          })
        )
       
        
          
       })
      .catch((error) => {
        console.log(error);
      });
   
  };
  return (
    <>
      <div className="container-fluid h-100">
        <div className="col d-flex justify-content-center align-items-center">
          <div className="col-lg-6 col-md-10 border border-4 border-black p-5 ">
              <div className="text-center">
            <h1 className="align-self-center">Login</h1>
            <div className="logo mt-3 mb-5">
              <img src="../../resources/Assets/Brandon-01.png" alt="" />
            </div>
              </div>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  className="form-control input"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Email"
                  className="form-control input"
                />
              </div>
              <button onClick={handleData} className="btn btn-primary align-self-center">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
