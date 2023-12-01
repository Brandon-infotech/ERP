import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Invoice = () => {

  const {user } =useSelector(state=>state); 
  const id =user.id;
  const [data1,setData1] = useState();
  const [data2,setData2] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState('pending');
  const [email, setEmail] = useState();
  const [btn,setBtn] = useState(true)
  const [amount,setAmount]=  useState();
  const [invoiceId ,setInvoiceId] = useState()


  const navigate = useNavigate();


  console.log(id);



  const handleTableData =(e,editor)=>{
      setData1(editor.getData())
    }
  const handleTermsData =(e,editor)=>{
      setData2(editor.getData())
    }
    
  
    const handleInvoice = (e) => {
      e.preventDefault();
      // console.log(e);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}api/invoice/new`,
          {
              createdBy:id,
              client:name,
              services:data1,
              terms:data2,
              status:status,
            amount: amount,
          },{headers:{"Authorization":user.token}}
        ).then((res) =>{
          console.log(res.data)
          setInvoiceId(res.data.invoices._id)
          
         })
        .catch((error) => {
          console.log(error);
        });
        // navigate(`/invoice/${invoiceId}`)
      }

      if (invoiceId) {
        console.log(invoiceId);
        navigate(`/invoice/${invoiceId}`)
      }

    console.log(data1);
  return (
    <Sidebar>
    <div className="container my-0 border border-3 pt-5 ">
      <div className="heading w-100 p-2  mb-3 text-white">Client's  Details</div>
      <div className="d-flex flex-wrap">
      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="name">Name of Client</label>
      <input  type="text" id='name' onChange={(e)=>setName(e.target.value)} className='form-control input' placeholder="Enter the name of the client"/>  

      </div>

      <div className="section-01 col-lg-6 col-sm-12">
      <label htmlFor="amount">Amount</label>
      <input  type="number" id='amount' onChange={(e)=>{
        setBtn(false) 
        setAmount(e.target.value)}} className='form-control input' placeholder='Enter the amount to be paid' />
      </div>
      </div>
        <div className="col-12 my-5 ">
            <h2>Enter the Headings</h2>
            <CKEditor  editor={ClassicEditor} onChange={(e,editor)=> handleTableData(e,editor)} className="col-lg-12 border border-1 invoice-data" >
            </CKEditor>
        </div>
            {/* {data1} */}

      <div className="col-12 my-5">
      <h2>Write the Terms and Conditions...</h2>
      <CKEditor editor={ClassicEditor} onChange={(e,editor)=> handleTermsData(e,editor)} className="col-lg-12 border border-1 invoice-data">
      </CKEditor>
        </div>
        {/* {data2} */}
      
      <div className=" d-flex flex-row justify-content-around my-4 w-auto">
      <button  type="button"  disabled={btn} onClick={handleInvoice} className="btns btn btn1 ">
        Generate Invoice</button>
      <button type="button" className="btn btns btn2 ">Discard</button>
      </div>
    </div>

    </Sidebar>
  );
};

export default Invoice;


{/* <div className="col-12 my-3">
<h2>Enter the Headings</h2>
<CKEditor editor={ClassicEditor} onChange={(editor)=> setData1(editor.getData())} className="col-lg-12 border border-1" >
  
</CKEditor>
</div> */}