import React from 'react';
import TButton from 'components/TButton';
import Logo from '../common/Logo';

const Landing  = () => (
    <div>
      <h2>
        <Logo />
      </h2>
      <div>The social language learning tool</div>
      <div style={{marginTop: '50px'}}>
        <TButton href="/auth/google">Login with Google</TButton>
      </div>
    </div>
)

export default Landing;