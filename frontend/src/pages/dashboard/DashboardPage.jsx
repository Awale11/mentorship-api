import React, { useState } from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardWelcome from '../../components/dashboard/DashboardWelcome'
import TaskForm from '../../components/task/TaskForm';
import TaskList from '../../components/task/TaskList';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api/apiClient';
import { LuLoader } from 'react-icons/lu';

const DashboardPage = () => {

  // this 2 state wa for create new task button-ka/open iyo close-ka ayay kashaqaynaya
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleFormClose = ()=> {
    setShowCreateForm(false)
    setEditingTask(null)
  }
// bu only form-ka false waye true ayuu kadhigi
  const handleCreateTaskClick = ()=> {
    setShowCreateForm(true)
  }

  // user-ka hada qadka ku jira task-giisa
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async() => {
      const response = await api.get('/tasks');
      return response.data;
    },
    retry: 1,
  })
//   console.log("Tasks data:", tasksQuery.data);
// console.log("Tasks error:", tasksQuery.error);

  const handleEditTask = (task)=> {
    setEditingTask(task)
    setShowCreateForm(true)
  }

  const handleStatusChange = async (taskId, statusData)=> {
    // TODO: mutation to update task status
    // This function will be called when the status of a task is changed
  }
  // if task page uu loading, soo bandhing
  if(tasksQuery.isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LuLoader className='animate-spin'/>
      </div>
    )
  }

  // if there is error
  if(tasksQuery.isError) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-500'>Error loading: {tasksQuery.error.message}</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* header */}
        <DashboardHeader/>
      {/* main content */}
      <main className='max-w-7xl mx-auto px-4 py-8 space-y-6'>
        {/* welcome section */}
        <DashboardWelcome
        // anything concerns form ino soo baxo cml
          showCreateForm={showCreateForm}
          // kan only when we create a task
          onCreateTask={handleCreateTaskClick}
        /> 
        {/* tasks section */}
        <div>
          <TaskList
          tasks={ tasksQuery.data || []}
          isLoading={tasksQuery.isLoading}
          onEdit={handleEditTask}
          onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {/* task dialog form */}
      <TaskForm
        task={editingTask}
        open={showCreateForm || !!editingTask}
        onOpenChange={handleFormClose} 
      />
    </div>
  )
}

export default DashboardPage