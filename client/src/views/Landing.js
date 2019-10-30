import React from 'react';
import TButton from 'components/TButton';
import Logo from '../common/Logo';

const Landing = () => (
    <div className="landing-page">
        <h2>
            <Logo />
        </h2>
        <div className="tagline">The social language learning game</div>
        <TButton href="/auth/google">Login with Google</TButton>
    </div>
)

export default Landing;