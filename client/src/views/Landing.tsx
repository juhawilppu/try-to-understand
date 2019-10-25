import React from 'react';
import { Button } from '@material-ui/core';

const Landing  = () => (
    <div>
      <h2>
        <span style={{color: 'red'}}>Dont</span>
        <span style={{color: 'orange'}}>Let</span>
        <span style={{color: 'green'}}>Me</span>
        <span style={{color: 'blue'}}>Be</span>
        <span style={{color: 'pink'}}>Misunderstood</span>
      </h2>
      <div>Next-generation language learning tool</div>
      <div style={{marginTop: '50px'}}><Button href="/auth/google" variant="contained" color="primary">Login with Google</Button></div>
    </div>
)

export default Landing;