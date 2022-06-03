import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import './ContactPage.css'
import { toast } from 'react-toastify';

const initialState = {
    name : "",
    lastname : "",
    phone_num : "",
}


const ContactAdd_Edit = () => {

    const [state, setState] = useState(initialState)

    const {name, lastname, phone_num} = state

    const navigate = useNavigate();

    const {id} = useParams();

    
    useEffect(() => {

        axios
        .get(`http://localhost:5000/get/customer/${id}`)
        .then((resp)=>setState({...resp.data[0]}));

    }, [id]) 

    const handleSubmit = (e) => {

        e.preventDefault()
        if (!name||!lastname||!phone_num) {
            toast.error("Please provide value into each input field")
        }else{
            if (!id) {
                axios
                .post('http://localhost:5000/api/post/customer',{
                    name, 
                    lastname, 
                    phone_num
                })
                .then(()=>{
                    setState({name:'',lastname:'',phone_num:''})
                })
                .catch((err)=>toast.error(err.response.data))
                toast.success("Data Successfully Inserted")
            }else{
                axios
                .put(`http://localhost:5000/put/customer/${id}`,{
                    name, 
                    lastname, 
                    phone_num
                })
                .then(()=>{
                    setState({name:'',lastname:'',phone_num:''})
                })
                .catch((err)=>toast.error(err.response.data))
                toast.success("Data Successfully Updated")
            }
           
            setTimeout(()=>{
                    navigate('/');
            },500);
        }
    };

    const handleInputChange = (e) => {

        const {name, value} = e.target;
        setState({...state, [name]:value})


    }


    return (
        <div style={{marginTop:'100px'}}>
            <form style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '400px',
                alignContent: 'center'
            }}
                onSubmit={handleSubmit}

          
            >
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='your name ........'
                    value={name || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='lastname'>Last Name</label>
                <input
                    type='text'
                    id='lastname'
                    name='lastname'
                    placeholder='your last name ........'
                    value={lastname || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='phone_num'>Phone Number</label>
                <input
                    type='number'
                    id='phone_num'
                    name='phone_num'
                    placeholder='your phone number ........'
                    value={phone_num || ""}
                    onChange={handleInputChange}
                />
                    <input type='submit' value='Save' />
                    <Link to='/' >
                        <input type='button' value='Go Back' />
                    </Link>

            </form>
        </div>
    )
}

export default ContactAdd_Edit
