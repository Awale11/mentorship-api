import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { LuLoaderCircle } from "react-icons/lu";
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'
import { useMutation } from '@tanstack/react-query'
import useAuthStore from '../../lib/store/authStore'




const LoginForm = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();

    const { setAuth } = useAuthStore()

    // state for form values
    const [formValues, setFormValues] = useState({
            email: '',
            password: ''
        })
    
        const [error, setError] = useState(null);
        const handleInputChange = (e)=> {
        const { name, value } = e.target; 
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

     const loginMutation = useMutation({
            mutationFn: async (credentials)=> {
                const response = await api.post('/auth/login', credentials);
                console.log('response data', response)
                return response.data;
            },
            
            onSuccess: (data)=> {
                // TODO: handle tokens
                if(data.token) {
                    const user = data.user;
                    const token = data.token;

                    setAuth(user, token);

                    navigate('/dashboard')
        
                }
                
            },
            onError: (error)=> {
                console.error('err',error)
                setError(extractErrorMessages(error))
            }
        })

        const handleSubmit = (e)=> {
        e.preventDefault();
        setError(null)

        if(!formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })

    }
  return (
    <Card className='w-full border-border'>
        <CardHeader className='space-y-1 pb-4'>
                <CardTitle className='text-xl text-center'>
                    Sign in
                </CardTitle>
                <CardDescription className={'text-center'}>
                    Enter your credentials to access your account
                </CardDescription>
                <form onSubmit={handleSubmit}>
                    <CardContent className='space-y-4 pt-0'>
                          {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>{error}</div>
                            )
                        }
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name='email' placeholder='email@email.com' required
                            value={formValues.email}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input name='password' placeholder='*****' 
                            required
                            value={formValues.password}
                            onChange={handleInputChange}
                            />
                        </div>

                         <div className='py-6'>
                             <Button type='submit' className='w-full cursor-pointer'>
                                    {isLoading ? ( <span className='flex items-center gap-2'><LuLoaderCircle /> Login account...</span>) : ('Login Account')}
                            </Button>
                          </div>
                    </CardContent>
                    
                    <CardFooter className='flex justify-center pt-0'>
                        <div className='text-center text-sm'>
                            Don't have an account ? <a 
                            onClick={()=> navigate('/register')}
                            className='text-rose-600 hover:underline cursor-pointer'>Sign Up</a>
                        </div>
                    </CardFooter>
                </form>
        </CardHeader>
    </Card>
  )
}
  

export default LoginForm