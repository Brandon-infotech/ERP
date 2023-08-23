import React, { useState } from "react";
import './login.css';
import axios from "axios";
import { register } from "../../redux/userSlice";
import { useDispatch } from "react-redux";



const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  // const [address, setAddress] = useState();
  const [photo, setPhoto] = useState();
  const [btn, setBtn] =useState(true)

  const imageSelect = async (event) => {
    let img = await event.target.files[0];
    console.log(img);

    const data = await new FormData();
    await data.append("file",img);
    await data.append("api_secret", "CEmy612fLVWbkGvZqMCfGi5K0gg");
    await data.append("api_key", "733353638974213");
    await data.append("upload_preset", "brandonerp");
    await data.append("cloud_name", "dnz2edgcu");

          
    // console.log(data);
    // console.log(photo);

    await fetch("https://api.cloudinary.com/v1_1/dnz2edgcu/image/upload",{
      method: "post",
      body: data})
      .then(res=>res.json())
      .then((data)=>{
        setPhoto(data.url)
        setBtn(false);
        console.log(data.url);
      })
      .catch((error) => {
            console.log(error);
          });
     
    }

    const dispatch= useDispatch();

const handleData = (e) => {
  // e.preventDefault();
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(phone);
  // console.log(address);
  console.log(photo);
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/auth/register`,
      {
          name:name,
          email:email,
          password:password,
          phone:phone,
          // address:address,
          photo:photo,
      },
    )
    .then((res) => console.log(res.data))
    .catch((error) => {
      console.log(error);
    });
  dispatch(register({
    name:name,
    email:email,
    // password:password,
    phone:phone,
    // addess:address,
    photo:photo
  }))
  

};
  return (
    <>
      <div className="container-fluid h-100">
        <div className="col d-flex justify-content-center align-items-center">
          <div className="col-lg-6 col-md-10 border border-4 border-black p-5 ">
              <div className="text-center">
            <h1 className="align-self-center">Register</h1>
            <div className="logo mt-3 mb-5">
              <img src="../../resources/Assets/Brandon-01.png" alt="" />
            </div>
              </div>
              <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input
                onChange={(e)=>setName(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                  className="form-control input"
                />
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
                  placeholder="Enter Password"
                  className="form-control input"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phone">Phone</label>
                <input
                onChange={(e)=>setPhone(e.target.value)}
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="form-control input"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="image">Add Image</label>
                <input
                onChange={imageSelect}
                  type="file"
                  className="form-control input"
                />
              </div>
              {/* <div className="mb-2">
                <label htmlFor="phone">Phone</label>
                <input
                onChange={(e)=>setPhone(e.target.value)}
                  type="phone"
                  placeholder="Enter Phone Number"
                  className="form-control input"
                />
              </div> */}
              <button onClick={handleData} disabled={true} className="btn btn-primary align-self-center">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
