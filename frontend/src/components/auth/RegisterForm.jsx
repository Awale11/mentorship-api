import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query' 
import { LuLoaderCircle } from "react-icons/lu";
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'



const RegisterForm = () => {

    // bu navigate wuxu naga caawinaa isku gudubka labada page login iyo register
    const navigate = useNavigate()
    // state-ka anku manage-gareeneno:email,name,password iyo confirmpassword
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState(null);

    // formValues-ka ayuu values siinaya bu method
    // handleChange wuxu qabanaa inuu value-ga update-gareeyo state-ka cusub kushubo
    const handleInputChange = (e)=> {
        const { name, value } = e.target;
        // name-ka ama isbedalka dhacay state-ka inan ku update-gareeno
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    // acces request-ga aan dirayno waye
    const registerMutation = useMutation({
        mutationFn: async (userData)=> {
            const response = await api.post('/auth/register', userData);
            console.log('response data', response)
            // kadib wixi database-ka kaaga yimaado noso celi
            return response.data;
        },
        
        onSuccess: ()=> {
            navigate('/login')
        },
        onError: (error)=> {
            console.error('err',error)
            setError(extractErrorMessages(error))
        }
    })

    const handleSubmit = (e)=> {
        e.preventDefault();
        setError(null)

        if(!formValues.name || !formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }
        // hadii form-ka wax ku jurin
        if(formValues.password !== formValues.confirmPassword) {
            setError('Password isnot correct')
            return
        }

        // hadii password-ka saxan yhay oo waxa dhan ok yihiin , mutation-ka ayan fulinaynaa
        // TODO: Mutation=request-ga aan u dirayno database-ka
        registerMutation.mutate({
            email: formValues.email,
            name: formValues.name,
            password: formValues.password
        })

    }
  return (

    <Card className='w-full border-border'>
        <CardHeader className='space-y-1 pb-4'>
                <CardTitle className='text-xl text-center'>
                    Create an account
                </CardTitle>
                <CardDescription className={'text-center'}>
                    Enter yout details to register
                </CardDescription>
                <form onSubmit={handleSubmit}>
                    <CardContent className='space-y-4 pt-0'>
                        {/* error-ka halkan ayan kuso bandhigaynaa */}
                        {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>{error}</div>
                            )
                        }
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Full Name
                            </div>
                            <Input 
                                name='name' 
                                placeholder='Ali' 
                                required
                                value= {formValues.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input
                                name='email' placeholder='email@email.com' 
                                required 
                                value= {formValues.email}
                                    onChange={handleInputChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input
                                name='password'
                                type={'password'}
                                placeholder='*****'
                                required
                                value= {formValues.password}
                                    onChange={handleInputChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Confirm Password
                            </div>
                            <Input 
                                name='confirmPassword' 
                                type={'password'}
                                placeholder='*****'
                                required
                                value= {formValues.confirmPassword}
                                    onChange={handleInputChange}
                            />
                        </div>

                         <div className='py-6'>
                            <Button type='submit' className='w-full cursor-pointer'>
                                {/*<LuLoaderCircle/>= bu react-icons lucide ayan ka keenay  */}
                                {/* TODO: change to the mutation pending */}
                                    {registerMutation.isPending ? ( <span className='flex items-center gap-2'><LuLoaderCircle /> Creating account...</span>) : ('Create Account')}
                                </Button>
                          </div>
                    </CardContent>
                    
                    <CardFooter className='flex justify-center pt-0'>
                        <div className='text-center text-sm'>
                            Already have an account ? <a 
                             onClick={()=> navigate('/login')}
                            className='text-rose-600 hover:underline cursor-pointer'>Sign In</a>
                        </div>
                    </CardFooter>
                </form>
        </CardHeader>
    </Card>
  )
}

export default RegisterForm
