import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { BsCamera, BsCameraVideo, BsFolder2 } from 'react-icons/bs'
import {  MdOutlineCall } from 'react-icons/md'
import { AiOutlinePaperClip } from 'react-icons/ai'
import {HiOutlineVideoCamera} from 'react-icons/hi'
import {PiPaperPlaneRightLight} from 'react-icons/pi'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ReactScrollToBttom from 'react-scroll-to-bottom'
import Message from '../../components/Message'
import socketIo from 'socket.io-client'


const ENDPOINT=process.env.REACT_APP_BACKEND_URL;
// const EndPoint='http://localhost:3001/'; 


const Chats = () => {


    const {user } =useSelector(state=>state); 
    const [data, setData] = useState(); 
    const [loading,setLoading]=useState(false);
    const [id,setId ] = useState();
    const [contact ,setContact] = useState();
    const [messages, setMessage] = useState([])

    
    // console.log(EndPoint);

    const socket = socketIo(ENDPOINT,{tranports:['websocket']}) 
    useEffect(() => {
      socket.on('connect',()=>{
        alert('Connect');
        console.log('connected');
      })
    
    }, [socket])
    

    // const navigate = useNavigate();
  
    useEffect(()=>{
        const fetchUsers = async()=>{
             await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/chats/all`,{headers:{"Authorization":user.token}})
            .then((res)=>{
            //   console.log(res.data.Chat);
              setLoading(true);
              setData(res.data.Chat)
            })
        }
        fetchUsers();
        },[])
  
    const chatDisplay =(id)=>{
        setId(id)
        // console.log(id)
         axios.get(`${process.env.REACT_APP_BACKEND_URL}api/chats/${id}`,{headers:{"Authorization":user.token}})
        .then((res)=>{
        //   console.log(res.data.message);
        //   console.log(res.data.message[0].content);
          setLoading(true);
          setContact(res.data.Chat)
          setMessage(res.data.message)
        })
    }
    // console.log(messages)




  return (
    <Sidebar>
        {
            loading?  <div className="container border border-3 py-0 chat-container">
            <div className="row mt-0 ">
                <div className="col-lg-3 px-0 rlt-25   border border-1">
                    <div className=" py-3 px-2 ">
                        <input type="text" className='form-control search-chat'  placeholder='Search a chat...'/>
                    </div>
                    <div className="border border-1 all-chats " >
                        {
                            data.map((i)=>(
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class" onClick={()=>chatDisplay(i._id)}>
                            <img src={i.profilePhoto?i.profilePhoto:i.chatImage} className=' rounded-5' alt="" />
                            <p>{i.chatName}</p>
                            {/* <p>{i.groupAdmin.profilePhoto}</p> */}
                        </div>
                            ))
                        }
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' rounded-5' alt="" />
                            <p>John Doe</p>
                            <p>Developer</p>
                        </div>
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' rounded-5' alt="" />
                            <p>John Doe</p>
                            <p>Developer</p>
                        </div>
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' rounded-5' alt="" />
                            <p>John Doe</p>
                            <p>Developer</p>
                        </div>
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' rounded-5' alt="" />
                            <p>John Doe</p>
                            <p>Developer</p>
                        </div>
                        <div className="d-flex  px-3 justify-content-between align-items-center chat-class">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' rounded-5' alt="" />
                            <p>John Doe</p>
                            <p>Developer</p>
                        </div>

                    </div>
                </div>

                <div className="col-lg-9 rr-25 px-0">
                    <div className="main-bg h-70 rrt-25 d-flex justify-content-between align-items-center px-3 text-white">
                        <div className=" d-flex justify-content-between align-items-center ">
                        <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" className=' chat_id_img rounded-5 h-25' alt="" />
                        {
                            contact?<div className='px-3 mt-0'>
                            <h2 className='my-0'>{contact.chatName}</h2>
                            <p className='my-0'>{contact.position}</p>
                        </div>:
                        <div className="px-3">
                            <h2>Welcome To The Chats</h2>
                        </div>
                        }
                        
                        </div>
                        <div className="right">
                            <MdOutlineCall size={25} className='text-white mx-2'/>
                            <BsCameraVideo size={25} className='text-white mx-2'/>
                        </div>
                    </div>
                    <div className="chat-section">
                        <ReactScrollToBttom className="chat-area  p-2">
                            {/* <div className="sender px-2  message" id="editting" data-bs-toggle="dropdown" aria-expanded="false">
                                <p>Hello this is sent message</p>
                                <ul class="dropdown-menu" aria-labelledby="editting">
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><MdEdit size={25}/>File</li>
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><BsPinAngle size={25}/>File</li>
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><RiDeleteBin6Line size={25}/>File</li>
                                </ul>
                            </div>
                            <div className="reciever px-2 message" >
                                <p>this is recieving message</p>
                                <ul class="dropdown-menu p-0" aria-labelledby="editting">
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><MdEdit size={25}/>File</li>
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><BsPinAngle size={25}/>File</li>
                                    <li className='d-flex dropdown-item icon-primary justify-content-around py-1'><RiDeleteBin6Line size={25}/>File</li>
                                </ul>
                                
                            </div> */}
                            {
                                messages?(
                                    messages.map((i)=>(
                                        <Message sender={i.sender} messages={i.content} />
                                        // <h2>{i.content} </h2>
                                        // <Message/>
                                    ))
                                ): <h2>Create A Chat...</h2>
                            }
                        </ReactScrollToBttom>
                        <div className="input-area d-flex py-0 align-items-center">
                            <input type="text" placeholder='Write a message' className=' my-0 form-control message-input' />
                            <div className="media-input d-flex justify-content-between align-items-center">
                                <AiOutlinePaperClip className=" mx-3 dropdown-toggle icon-primary" data-bs-toggle="dropdown" type='button' aria-expanded="false" size={30} />
                                    <ul className="dropdown-menu py-0 px-0 ">
                                        <li className="dropdown-item py-0 my-0"><input type="file" id='file' accept="application/pdf"  hidden/>
                                        <label htmlFor="file" className='icon-primary d-flex gap-5 py-2 '>
                                            <BsFolder2 size={25}/>File
                                        </label></li>
                                        <li className="dropdown-item py-0 my-0"><input type="file" id='video-file' accept='video/*'  hidden/>
                                        <label htmlFor="video-file" className='icon-primary d-flex gap-5  py-2 '>
                                            <HiOutlineVideoCamera size={25}/>Video
                                        </label></li>
                                        <li className="dropdown-item py-0 my-0"><input type="file" id='image-file' accept='image/*'   hidden/>
                                        <label htmlFor="image-file" className='icon-primary d-flex gap-5 py-2  '>
                                            <BsCamera size={22}/>Image
                                        </label></li>
                                        
                                        
                                    </ul>
                                <PiPaperPlaneRightLight className='icon-primary' size={30}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        : <h2>Loading...</h2>
        }
      
    </Sidebar>
  )
}

export default Chats