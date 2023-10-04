import React from 'react';
import { GoogleLogin } from 'react-google-login';

function SignupWithGoogle({ onSuccess, onFailure }) {
    return (
        <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign up with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default SignupWithGoogle;
