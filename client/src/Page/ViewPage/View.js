import { useEffect, useState } from 'react'
import { useParams,Link} from "react-router-dom";
import axios from 'axios'
import './view.css'


const View = () => {

    const {id} = useParams();

    // Loading
    const [isLoading,setIsloading]=useState(true);

    // Customer data Container 
    const [customer,setCustomer]=useState({})

    const getCustomerDataByID = async () =>{

        
        const result = await axios (`http://localhost:5000/get/customer/${id}`)
    
        
        setCustomer(result.data)
        setIsloading(false)
          
        }
    
    useEffect(()=>{
    
    
            getCustomerDataByID()
            
    
    },[customer])


    return isLoading?<h1>Loading .......</h1>:
        <div style={{marginTop:'150px'}}>
            <div className='card'>
                <div className='card-header'>
                    <p>User Contact Detail</p>
                </div>
                <div className='container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Name: </strong>
                    <span>{customer[0].name}</span>
                    <br/>
                    <br/>
                    <strong>Last Name: </strong>
                    <span>{customer[0].lastname}</span>
                    <br/>
                    <br/>
                    <strong>Phone Number: </strong>
                    <span>{customer[0].phone_num}</span>
                    <br/>
                    <br/>
                    <strong>Register Date: </strong>
                    <span>{customer[0].reg_date.slice(0, 10)}</span>
                    <br/>
                    <br/>
                    <Link to='/' >
                        <input type='button' value='Go Back' />
                    </Link>
                </div>
            </div> 
        </div>
    
}

export default View
