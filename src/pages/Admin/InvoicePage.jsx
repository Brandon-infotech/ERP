import React, { useEffect, useState } from 'react'
import logo from '../../resources/Assets/Brandon-02.png'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import qr from '../../resources/Assets/qr.jpg';




const InvoicePage = () => {
  const {user } =useSelector(state=>state); 
  const [client, setClient] = useState();
  const [amount, setAmount] = useState();
  const [table, setTable] = useState();
  const [terms, setTerms] = useState();
  const [date, setDate] = useState();

  const {id} = useParams()
  // const id='64e78524bfebce4adc751087';
  console.log(id);

  useEffect(()=>{
    const fetchUsers = async()=>{
         await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/invoice/${id}`,{headers:{"Authorization":user.token}})
        .then((res)=>{
          // console.log(data);
          console.log(res.data.invoices);
          setAmount(res.data.invoices.amount);
          setTable(res.data.invoices.services);
          setTerms(res.data.invoices.terms);
          setClient(res.data.invoices.client);
          setDate(res.data.invoices.createdAt)
        
        })
    }
    fetchUsers();
    },[])

    const htmlString1= table;
    const htmlString2= terms;
  return (
    <>
    <div className="container page invoice">
      <div className="row">
        <div className="col-6 d-flex flex-column mt-5">
       <h2>BRANDON</h2>
       <a className='my-3' href="mailto:https://www.brandon.co.in">https://www.brandon.co.in</a>
       <a className='my-3' href="tel:9602600423">(+91) 960 2600 243</a>
       <a className='my-3' href="mailto:contact@brandon.co.in">contact@brandon.co.in</a>

       <span className='pay_method my-3'>UPI ID: 9602600423@paytm</span>
       <span className='pay_method'>Paypal: saksham069@gmail.com</span>
       <div className="billing">
        <span className='strip w-50 d-block px-2 text-white mt-4' >Bill  To</span>
        <div className='textSize w-50 px-3 mb-4  border border-1 border-black py-1'>{client}</div>
       </div>
        </div>
        <div className="col-6 d-flex justify-content-start align-items-end flex-column">
            <img src={logo} alt="" width={300} />
            <div className="strip w-50 px-3 text-white text-center">
              Date
            </div>
            
            <div className=" w-50 px-3 text-center border border-1 border-black py-2">
            {date}
            </div>
            <div className="qr mx-5 my-2">
            <img src={qr} alt="" width={200} />
            </div>
        </div>
      </div>
      <div className="row"  >
        <div className="col-9 px-0 border border2">
          <div className="strip text-center text-white">
            Description
          </div>
          <div className="pricing p-4" dangerouslySetInnerHTML={{__html:htmlString1}}>
            
          </div>
        </div>
        <div className="col-3 px-0">
          <div className="strip text-center text-white">
            Amount (in ₹)
          </div>
          <div className="total">

          </div>

        </div>
        <div className="last-section py-2 d-flex justify-content-end gap-5 px-5 border border-top">
           <span className='f-weight textSize'>Total</span>
           <span className='f-weight textSize'>₹ {amount} </span>
            </div>
      </div>
      <div className="row my-5">
        <h3>Terms and Conditions</h3>
        <div className="terms" dangerouslySetInnerHTML={{__html:htmlString2}}>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default InvoicePage