'use client'

import Button from "./Button";

import {signIn} from 'next-auth/react'

interface SignInButtonProps {
    buttonText : string;
}
const SignInButton : React.FC<SignInButtonProps> = ({
    buttonText
}) => {
    const handleSignIn = () => {
        signIn('auth0', {callbackUrl : '/'})
    }

    return (
        <Button onClick={handleSignIn} text={buttonText} className='w-44 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl'/>
    )
};

export default SignInButton;