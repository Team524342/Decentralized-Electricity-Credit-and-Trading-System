
import React from 'react';
import ConsumerDashboard from './pages/ConsumerDashboard';
import {BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom';
import Register from './pages/Register';


function App() {
  
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to='/consumer' style={styles.link}>Consumer Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/consumer' element={<ConsumerDashboard />} />
      </Routes>


    </Router>
   
   
  
  );
  
}
const styles ={
    navbar:{
    backgroundColor: '#007bff',
    padding: '10px',
    textAlign: 'center',
    },
    link:{
    color: 'white',
    margin: ' 0 10px',
    textDecoration: 'none',
    fontWeight:'bold',
    },
  };
export default App;
