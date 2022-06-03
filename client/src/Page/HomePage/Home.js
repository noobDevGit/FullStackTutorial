import './Home.css'
import {toast} from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";


const Home = () => {

// Customer data Container 
const [customer,setCustomer]=useState({})

// Loading
const [isLoading,setIsloading]=useState(true);


const getCustomerData = async () =>{

        
    const result = await axios (`http://localhost:5000/get/customer`)

    
    setCustomer(result.data)
    setIsloading(false)
      
    }

useEffect(()=>{


        getCustomerData()
        

},[customer])


const deleteContact = (id) =>{

if (window.confirm("Are you sure you want to delete this data ?")) {

    axios.delete(`http://localhost:5000/delete/customer/${id}`);
    toast.success("Data deleted Successfully")
    setTimeout(() => {
        getCustomerData()
   }, 500);

}


}

    return isLoading ? <h1>Loading....</h1>:
    
    <div style={{marginTop:'150px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

    <Link to={`/contact/add_contact`} >
        <button className='btn btn-contact' > Add Contact </button>
    </Link>

        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign:'center'}}>Name</th>
                    <th style={{textAlign:'center'}}>Lastname</th>
                    <th style={{textAlign:'center'}}>Phone Number</th>
                    <th style={{textAlign:'center'}}>Registry Date</th>
                    <th style={{textAlign:'center'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {customer.map((content)=>(

                        <tr key={content.id}>
                            <td>{content.name}</td>
                            <td>{content.lastname}</td>
                            <td>{content.phone_num}</td>
                            <td>{content.reg_date.slice(0, 10)}</td>
                            <td>
                            <Link to={`/contact/update/${content.id}`} >
                                  <button className='btn btn-edit' > Edit </button>
                            </Link>
                           
                                  <button className='btn btn-delete' onClick={()=>deleteContact(content.id)}> Delete </button>
                           
                            <Link to={`/contact/view/${content.id}`} >
                                  <button className='btn btn-view' > View </button>
                            </Link>
                            </td>
                        </tr>
                ))}

            </tbody>
        </table>
    </div>
    
}

export default Home
