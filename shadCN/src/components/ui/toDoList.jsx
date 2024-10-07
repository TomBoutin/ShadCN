import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToDoItem } from '@/components/ui/toDoItem'

export function ToDoList() {
  const [items, setItems] = useState([])
  const [newItemText, setNewItemText] = useState('')

  useEffect(() => {
    const storedItems = localStorage.getItem('todo-items')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('todo-items', JSON.stringify(items))
    }
  }, [items])

  const addItem = () => {
    if (newItemText.trim() === '') return
    setItems([
      ...items,
      { id: Date.now(), text: newItemText, completed: false },
    ])
    setNewItemText('')
  }

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
    localStorage.removeItem('todo-items')
  }

  const editItem = (id, newText) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    )
  }

  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl mb-4">To-Do List</h2>
      <div className="flex mb-4">
        <Input
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Ajouter une tâche"
          className="flex-1 mr-2"
        />
        <Button onClick={addItem}>Ajouter</Button>
      </div>
      <div>
        {items.map((item) => (
          <ToDoItem
            key={item.id}
            item={item}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onEdit={editItem}
          />
        ))}
      </div>
    </div>
  )
}