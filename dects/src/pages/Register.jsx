import React ,{ useState } from 'react';
import '../assets/register.css';
import axios from 'axios';
function Register(){
    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        role:'consumer',
        wallet_address:'',
        location:''
    });
    const [message,setMessage]=useState('');
    const handleChange=(e) =>{
        setFormData({ ...formData,[e.target.name]:e.target.value})
    };



   //handle submit event
   const handleSubmit =async(e) =>{
    e.preventDefault();
    setMessage("Registering...");
    try{
        const res =await 
        axios.post('http://127.0.0.1:8000/api/register/',formData);
        console.log("Response:",res.data)
        setMessage('Registration successful!');
        


    }catch(error){
        console.error("Registration error:",error.response?.data||error.message);
        setMessage('Registration failed . Check Details or server connections.');
    }
   };

    return(

    
    
     <div className="container" >
        <h2> User Registration Form</h2>
        <form className="form" onSubmit={handleSubmit}>
      
            <label className='block text-sm font-medium text-gray-700'>Full Name</label>   
            <input type="text" name="name" placeholder="Full Name" 
            value={formData.name} onChange={handleChange}required/>
        
          
            <label >Email Address</label>
            <input type="email" name="email" placeholder="Email" 
            value={formData.email} onChange={handleChange}required />
         
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" 
            value={formData.password} onChange={handleChange}required />
           
           <label>Role</label>
           <select name='Role' value={formData.role} onChange={handleChange}>
            <option value="consumer">Consumer</option>
            <option value="producer">Producer</option>
           </select>
          
           
            <label>Wallet Address</label>
            <input type="text" name="wallet_address" placeholder="wallet_address" 
            value={formData.wallet_address} onChange={handleChange}/>
          
           
           <label>Location</label>
            <input type='text' name='location' placeholder='City,State/Region' 
            value={formData.location} onChange={handleChange}required/>

            <button type="submit">Register</button>
        </form>
<p>{message}</p>
    </div> 
   
    );
}

export default Register;