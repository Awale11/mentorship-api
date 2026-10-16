
// qofka kaliya admin inu yhy ayu data kuso laaban kara
import React, { useEffect } from 'react'
import useAuthStore from '../../lib/store/authStore'
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router';
import { LuLoader } from 'react-icons/lu';
import api from '../../lib/api/apiClient';

export const AdminProtectedRoute = ({ children }) => {

    const { user, setAuth, clearAuth, token} = useAuthStore();
    
        // waa hook oo nasiinaya page-ka markaas aan joogno
        const location = useLocation();
    
        // here we sent request to the auth.js in folder-ka routes oo ku jira backend-ga,kadib it returns us yes or no. haduu dhaho user-kan token wanka hayaa wala fisixi karaa,hadii kale we dont allow user-ka inu so booqdo dashboard-ka aan rabno inan protect kadhigno.
        // wixi getMethod ah=we use useQuery
        // wixi postMethod ah=use Mutation
        const { data, error, isLoading, isError, isSuccess } = useQuery({
            queryKey: ['currentUser'],
            queryFn: async ()=> {
                const response = await api.get('/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data
            },
            // here wa isku dayga react ay isku dayeeso inee so hesho user-ka rabo inu galo dashboard-ka lkn an token heesanin. we say to the react try only one time
            retry: 1
        }) 
        // here we want user-ka in la fasaxo ama la celiyo
        useEffect(()=> {
            // qalad haduu jiro user-ka waxa u heesto oo dhan halaga tiro oo tokens ah
            if(isError){
                clearAuth();
            }
        },[isError, error, clearAuth]);
    
        // here waa if success uu jiro
        useEffect(()=> {
            if(isSuccess && data){
                setAuth(data, token)
            }
        }, [isSuccess, data, setAuth, token])
    
        if(isLoading){
            return (
                <div className='flex h-screen iems-center justify-center'>
                    <LuLoader className='animate-spin'/>
                </div>
            )
        }
    
        // qalad haduu jiro loginIpage-ka udir and dib yuu usoo laabanin
        if(isError) {
            return <Navigate to='/login' state={{ from: location }} replace/>
        }

        if(!user) {
        return <Navigate to='/login' state={{ from: location }} replace/>
    }
        if(user.role != 'admin'){
            return <Navigate to='/dashboard' state={{ from: location }} replace/>
        //     return <h1>Nice Try, Only for admins</h1>
        }
  return children
}
