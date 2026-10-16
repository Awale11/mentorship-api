import React from 'react'
import { LuClipboardCheck } from 'react-icons/lu';
import useAuthStore from '../../lib/store/authStore';
import {Button} from '@/components/ui/button'
import {useNavigate} from 'react-router'
import {useQueryClient} from '@tanstack/react-query'

const DashboardHeader = () => {

    const { user, clearAuth } = useAuthStore();
    //we can manage all querys socda and we can stop
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const handleLogout = ()=> {
        if(confirm('Are you sure you want to logout?')){
            clearAuth();
            // every query dhici lahaa meeshaas ku jooji.because maybe protect inuu naga daba shaqeeyo oo page-kan token la'an laso galin
            queryClient.clear();
            navigate('/login', {replace: true})
        }
    }
  return (
    <header className='bg-card border-b border-border shadow-sm'>
        <div className='w-full px-4 py-4 flex items-center justify-between'>

            {/* qeybta loga-da */}
         <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <LuClipboardCheck className='h-4 w-4 text-primary-foreground'/>
            </div>
            <h1 className='text-xl font-semibold text-foreground'>Task Dashboard</h1>
         </div>

         {/* qeybta welcome ah */}
         <div className='flex items-center gap-4'>
            <span className='text-sm text-muted-foreground'> Welcome, <span className='font-medium text-foreground'>{user?.name || 'User'}</span>
            </span>

            {/* user-ka booskiisa button ka dhig */}
            <Button variant={'outline'} onClick={handleLogout}>
                logout
            </Button>
         </div>
        </div>
    </header>
  )
}

export default DashboardHeader