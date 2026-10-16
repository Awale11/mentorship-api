import React, { useState } from 'react'
import { LuClipboard, LuClipboardCheck, LuSearch } from 'react-icons/lu'
import {Input} from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import TaskCard from './TaskCard'

const TaskList = ({tasks= [], isLoading= false, onEdit,  onStatusChange}) => {
    
    const [searchTerm, setSearchTerm] = useState('')

    // Filter tasks based on searc term
    // bu include=looks all titleska kadib xarafka an qornay mise word-ka aan qornay ayuu nooso saari
    const filteredTasks = tasks.filter(task => {
        const matchesSeacrh = task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || (task.description && task.description.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        return matchesSeacrh;
    })

//     console.log("Tasks received by TaskList:", tasks);
//   console.log("Tasks length:", tasks.length);

    // here all tasks-ka ayan hal hal u wacanaynaa
    // hal method ayan iskugu geenay all stats-ka
    const getTaskStats = ()=> {

        // here waa wixi length u baahan
        const AllTasksByStatus = {
            pending : tasks.filter(task => task.status === 'pending').length,
            inProgress : tasks.filter(task => task.status === 'in progress').length,
            completed : tasks.filter(task => task.status === 'completed').length,
        }
        
        // we add catogarize task
        // wixi data u baahan
        const categorizedTasks = {
            all: filteredTasks,
            pending: filteredTasks.filter(task => task.status === 'pending'),
            inProgress: filteredTasks.filter(task => task.status === 'in progress'),
            completed: filteredTasks.filter(task => task.status === 'completed'),
        }

        // we add variable stats oo shaqada kor qabto
        const stats = {
            total: tasks.length,
            pending: AllTasksByStatus.pending,
            inProgress: AllTasksByStatus.inProgress,
            completed: AllTasksByStatus.completed,
        }

        const total = tasks.length;
        
        return { total, stats, categorizedTasks }
    }
    // here we make variable ladhahyo stats
    const {stats, total, categorizedTasks} = getTaskStats();

    // so bandhigada tasks
    const TaskGrid = ({tasks, emptyMessage}) => {

    
    if(tasks.length === 0) {
        return (
            <div className='text-center py-12'>
                <div className='mx-auto max-w-md'>
                    <LuClipboardCheck className='mx-auto h-12 w-12 text-muted-foreground'/>
                    <h3 className='mt-4 text-sm font-medium text-foreground'>No tasks found</h3>
                    <p className='mt-2 text-sm text-muted-foreground'>{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                tasks.map(task => (
                    <TaskCard
                    // si aan uga leexano errors-ka react uso saaraayo
                        key={task._id}
                        // task-gan waa task-iga markaas lamarooyo
                        task={task}
                        onEdit={onEdit}
                        onStatusChange={onStatusChange}
                    />
                ))
            }

        </div>
    )
    }

  return (
    <div className='space-y-6'>
        {/* Status Overview */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {/* bg-card */}
            <div className='bg-card p-4 rounded-lg border shadow-sm'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-muted-foreground'>
                        Total
                    </p>
                    <LuClipboard className='h-4 w-4 text-muted-foreground'/>
                </div>
                <p className='text-2xl font-bold'>{stats.total}</p>
            </div>

            {/* pending */}
            <div className='bg-card p-4 rounded-lg border shadow-sm'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-muted-foreground'>
                        Pending
                    </p>
                    <div className='h-2 w-2 rounded-full bg-yellow-500'></div>
                </div>
                <p className='text-2xl font-bold text-yellow-600'>{stats.pending}</p>
            </div>

            {/* in progress */}
            <div className='bg-card p-4 rounded-lg border shadow-sm'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-muted-foreground'>
                        In Progress
                    </p>
                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                </div>
                <p className='text-2xl font-bold text-blue-600'>{stats.inProgress}</p>
            </div>

            {/* Completed */}
             <div className='bg-card p-4 rounded-lg border shadow-sm'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium text-muted-foreground'>
                        Completed
                    </p>
                    <div className='h-2 w-2 rounded-full bg-green-500'></div>
                </div>
                <p className='text-2xl font-bold text-green-600'>{stats.completed}</p>
            </div>
        </div>

        {/* search input */}
        <div className='flex items-center gap-4'>
            <div className='relative flex-1 max-w-md'>
                <LuSearch className='absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2'/>
                <Input
                type='text'
                placeholder='Search tasks...'
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                className='pl-10'
                />
            </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
         <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger className='flex items-center gap-2' value="all">All
            <Badge variant='secondary'>
                {stats.total}
            </Badge>
        </TabsTrigger>

        <TabsTrigger className='flex items-center gap-2' value="pending">Pending
            <Badge variant='secondary'>
                {stats.pending}
            </Badge>
        </TabsTrigger>

        <TabsTrigger className='flex items-center gap-2' value="inProgress">In Progress
            <Badge variant='secondary'>
                {stats.inProgress}
            </Badge>
        </TabsTrigger>

        <TabsTrigger className='flex items-center gap-2' value="completed">Completed
            <Badge variant='secondary'>
                {stats.completed}
            </Badge>
        </TabsTrigger>
            
             </TabsList>
            <TabsContent value="all">
                <TaskGrid
                    tasks={categorizedTasks.all}
                />
            </TabsContent>
            <TabsContent value="pending">
                <TaskGrid
                    tasks={categorizedTasks.pending}
                    emptyMessage={'No pending tasks found'}
                />
            </TabsContent>
            <TabsContent value="inProgress">
                <TaskGrid
                    tasks={categorizedTasks.inProgress}
                    emptyMessage={'No inProgress tasks found'}
                />
                    
            </TabsContent>
            <TabsContent value="completed">
                <TaskGrid
                    tasks={categorizedTasks.completed}
                    emptyMessage={'No completed tasks found'}
                />
            </TabsContent>
            </Tabs>
    </div>
  )
}

export default TaskList