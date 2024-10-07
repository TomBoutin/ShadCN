import React from 'react'
import { ToDoList } from '@/components/ui/toDoList'
import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <ToDoList />
    </div>
  )
}