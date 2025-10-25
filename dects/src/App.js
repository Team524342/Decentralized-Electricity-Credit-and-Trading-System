
import React from 'react';
import ConsumerDashboard from './pages/ConsumerDashboard';
<<<<<<< HEAD
import {BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom';
import Register from './pages/Register';

=======
import ProducerDashboard from './pages/ProducerDashboard';
import AdminDashboard from './pages/admindashboard';
>>>>>>> f7624e8445792a11a9d876293705b19033dc2ac0

function App() {
  
  return (
<<<<<<< HEAD
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Register</Link>
        <Link to='/consumer' style={styles.link}>Consumer Dashboard</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/consumer' element={<ConsumerDashboard />} />
      </Routes>
=======
   <div>
    <ConsumerDashboard />
    <ProducerDashboard />
    <AdminDashboard />
   </div>
  );
}
>>>>>>> f7624e8445792a11a9d876293705b19033dc2ac0


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
