import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import './Landing.css'

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <nav className='top'>
        <h2>FPRT</h2>
        <div>
        <Button variant='outlined' >

<Link to='/login'>Login</Link>


</Button>
          <Button variant='outlined' >

<Link to='/register'>Register</Link>


</Button>
        </div>
      </nav>
      <div className='landing-inner'>
        
        <div className='buttons'>
          
        </div>
      </div>
    </section>
  );
};

export default Landing;
