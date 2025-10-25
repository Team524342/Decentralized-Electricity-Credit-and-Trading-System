import { useNavigate } from "react-router-dom"

function Register(){
    const navigate =useNavigate();
    return(
     <div style={styles.container}>
        <h2> Registration Form</h2>
        <form 
        // onSubmit={handleSubmit}
         style={styles.form}>
            <input type="text" name="name" placeholder="Full Name"
            // onChange={handleChange} 
            required/>
            <input type="email" name="email" placeholder="Email"
            // onChange={handleChange}
             required />
            <select name="role"
            //  onChange={handleChange}
             >
             <option value="consumer">Consumer</option>
             <option value="producer">Producer</option>
            </select>
            <input type="text" name="meter_id" placeholder="Meter ID"
            // onChange={handleChange} 
            required/>
            <input type="password" name="password" placeholder="Password"
            // onChange={handleChange}
             required />
            <button type="submit">Register</button>
        </form>

     </div>
    );
}
const styles={
    container:{
        width:"350px",
    },
    form:{
        display:'flex'
    },
};
export default Register;