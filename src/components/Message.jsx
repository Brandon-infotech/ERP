import React, { useState } from "react";
import { BsPinAngle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const Message = ({sender,messages}) => {
  const {user } =useSelector(state=>state); 
  const [pinned,setPinned] = useState(false);

  const pinMessage= ()=>{
    console.log('pinned');
    setPinned(!pinned);
}
  // console.log(user.id);

  // console.log(messages);
  // console.log(sender.name);
  if (sender===user.id ) {
    return (
      <>
        <div className={`reciever px-2 message my-2 otherUsers ${pinned? pinned :''} `} id="editting" data-bs-toggle="dropdown" aria-expanded="false">
          <p>{`${sender.name} : ${messages}`}</p>
          <ul class="dropdown-menu p-0" aria-labelledby="editting">
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <MdEdit size={25} />
              Edit
            </li>
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <BsPinAngle size={25}  onClick={()=>pinMessage()} />
              Pin
            </li>
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <RiDeleteBin6Line size={25} />
              Delete
            </li>
          </ul>
        </div>
      </>
    );
  }else{
    return(
      <>
           <div className={`reciever px-2 message my-2 loggedUser  ${pinned? pinned :''}` } id="editting" data-bs-toggle="dropdown" aria-expanded="false">
          <p>{`${messages}`}</p>
          <ul class="dropdown-menu p-0" aria-labelledby="editting">
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <MdEdit size={25} />
              Edit
            </li>
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <BsPinAngle size={25}  onClick={()=>pinMessage()} />
              Pin
            </li>
            <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
              <RiDeleteBin6Line size={25} />
              Delete
            </li>
          </ul>
        </div>
      </>
    )
  }
};

export default Message;
