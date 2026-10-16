import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"

// API function to create a todo or tasks
async function createTodo(newTask){
    const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTask),
    });
    if(!response.ok) throw new Error('Failed to create todo')
}

const Task = () => {

    const [ task, setTask] = useState('');

    const queryClient = useQueryClient();

    // mutation qaabkan ayuu u dhacaa. waana qaabka data-base data loo geeyo
    const mutation = useMutation({
        mutationFn: createTodo,
        // data-da markee succesful u dhacdo
        onSuccess: ()=>{
            // bu helps us every new task aa create-gareeno si otomatic ah inuu u dibaan galiyo anagoo refresh dhihin
            queryClient.invalidateQueries({ queryKey: ['tasks']})
        }

    })

    const handleAdd = ()=> {
        mutation.mutate({ title: task, completed: false})
    }
  return (
    <div>
        <input type="text" onChange={(e)=> setTask(e.target.value)} />
        <button onClick={handleAdd}>Add Task</button>
        {/* bu button shadcn'dan install dedik ve hersey asaa wato css-kiisa. component var ve icinde de button.jsx var bu classNameler oradan aliyoruz */}
        <Button variant={'outline'} size='lg'>Add Task</Button>

    </div>
  )
}

export default Task