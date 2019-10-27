import React from 'react';
import { Button } from '@material-ui/core';
import Logo from '../common/Logo';

const Landing  = () => (
    <div>
      <h2>
        <Logo />
      </h2>
      <div>The next-generation language learning tool</div>
      <div style={{marginTop: '50px'}}><Button href="/auth/google" variant="contained" color="primary">Login with Google</Button></div>
    </div>
)

export default Landing;