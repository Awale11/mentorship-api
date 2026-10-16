import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
  return (
    // 3daan dix ugu horeeso waa for layout

    <div className='min-h-screen flex flex-col items-center justify-center bg-background'>

        {/* inset-0= all afarta gees zero demek */}
        <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50' />
        <div className='z-10 w-full max-w-md px-4'>
            <div className='mb-8 text-center'>
                <h1 className='text-3xl font-bold text-foreground'>Welcome Back</h1>
                <p>We're gald to see you again</p>
            </div>

            {/* Login Form */}
                <LoginForm/>
        </div>
        </div>
  )
}

export default LoginPage