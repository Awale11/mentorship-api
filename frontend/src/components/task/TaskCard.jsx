import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button"
import { LuCalendar, LuEllipsisVertical, LuLoader, LuPen, LuTrash2 } from 'react-icons/lu'
import { toast } from "@/components/ui/toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'

// variable public ama constant ah waa style yani
const STATUS_CONFIG = {
    'pending': {
        variant: 'secondary',
        label: 'pending',
        color: 'text-yellow-600'
    },
    'in progress': {
        variant: 'default',
        label: 'In Progress',
        color: 'text-blue-600'
    },
    'completed': {
        variant: 'outline',
        label: 'Completed',
        color: 'text-green-600'
    }
};

const TaskCard = ({ task,onEdit, isLoading = false}) => {


    // bu da marka dialog so bixinayno like user-ka confirmation ka qaadeeno
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // for using tabs
    const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG['pending'];

    // here we make function for due-date
    const formatDate = (dateString) => {
        if(!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

    // this method checks task-igaan xilliga larabay mala dhaafay
    // anaga waxan rabnaa task-ga pending ama inProgress ah oo waqtigooda dhamaaday inan hubino
    const isOverdue = (dueDate) => {
        if(!dueDate || task.status === 'completed') return false;
        // new date-ka maka yaryhy taariikhda hada lajoogo
        return new Date(dueDate) < new Date();
    }

    // kan waa taariikhda uu dhacaayo
    const dueDate = formatDate(task.dueDate);
    // kan neh waa taarikhda mala dhaafay xiliga user-ka task-iga uusameenaaye
    const overdue = isOverdue(task.dueDate);

  const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });

    toast.add({
      title: 'Task deleted successfully',
      description: 'Your task has been deleted.',
      type: 'success',
    });
  },

  onError: (error) => {
    toast.add({
      title: 'Error deleting task',
      description: error.message || 'Please try again.',
      type: 'error',
    });

    console.error('Error deleting task:', error);
  },
});

    const handleDeleteConfirm = async ()=> {
        try {
            await deleteMutation.mutateAsync(task._id);
            setShowDeleteDialog(false);
        } catch (error) {
             toast.add(`Error confirming delete: ${error.message}`);
            console.error('Error confirming delete:'. error)
        }
    }
  return (
    <>
        <Card className='w-full transform-shadow hover:shadow-md'>
            <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                    <CardTitle className='text-lg leading-tight'>{task.title}</CardTitle>

                    {/* here tabs-ka agtooda pending gibi stats-ka ayan kuso bandhignay */}
                    <div className='flex items-center gap-2'>
                        <Badge variant={statusConfig.variant} className='shrink-0'>
                            {statusConfig.label}
                        </Badge>

                        {/* DropDown */}
                        <DropdownMenu>
                            {/* wa 3... isdulsaaran marka click lasiiyo ee options so baxayan */}
                            <DropdownMenuTrigger>
                            
                                 <span className='sr-only'>Open menu</span>
                                 <LuEllipsisVertical className='h-4 w-4'/>
                                
                            </DropdownMenuTrigger>

                            {/* dhibcahaan marki click lasiiyo wixi so bixi lahaa */}
                            <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                onClick={()=> onEdit(task)}
                                >
                                    <LuPen className='mr-2 h-4 w-4'/>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                onClick={()=> setShowDeleteDialog(true)}
                                >
                                    <LuTrash2 className='mr-2 h-4 w-4'/>
                                    Delete
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            {/* CardContent .qoraaladii iyo wixi aan u baahneen ayan kuso bandhigaynaa*/}
            <CardContent>
            {/* description */}
            {
                task.description && (
                    <p className='text-muted-foreground text-sm leading-relaxed'>{task.description}</p>
                )
            }
            {/* due date */}
            {
                dueDate && (
                    <div className='flex items-center gap-2'>
                        <LuCalendar className='h-4 w-4 text-muted-foreground'/>
                        <span className='text-sm text-muted-foreground'>Due:</span>
                        <Badge
                        variant={overdue ? 'destructive' : 'outline'}
                        className='text-xs'
                        >
                            {dueDate}
                            {overdue && '(Overdue)'}

                        </Badge>
                    </div>
                )
            }

            {/* Simple status indicator=xiligaas aya lasameeyay */}
            <div className='flex items-center justify-between text-xs text-muted-foreground pt-2 border-t'>
                <span>Created: {formatDate(task.createdAt)}</span>
                <span className={statusConfig.color}>{statusConfig.label}</span>
            </div>

            </CardContent>
        </Card>

        {/* Delete confirmation dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action conn't be undone. This will permanently delete the task '{task.title}'.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    onClick={handleDeleteConfirm}
                    className='bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
                    >
                        {
                            deleteMutation.isPending ? (
                                <span className='flex items-center gap-2'><LuLoader/>
                                Deleting...
                                </span>
                            ) : ('Delete')
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    </>
  )
}

export default TaskCard