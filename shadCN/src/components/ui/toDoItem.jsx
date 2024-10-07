import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

export function ToDoItem({ item, onToggle, onDelete, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [editText, setEditText] = useState(item.text)

  const handleEdit = () => {
    onEdit(item.id, editText)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
      />
      <span className={`flex-1 ml-2 ${item.completed ? 'line-through' : ''}`}>
        {item.text}
      </span>
      <div className="flex space-x-2">
        <Button variant="ghost" onClick={() => onDelete(item.id)}>
          <TrashIcon className="w-5 h-5" />
        </Button>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <Button variant="ghost">
              <Pencil1Icon className="w-5 h-5" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-white rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2">
              <Dialog.Title className="text-lg font-medium">Modifier une tâche</Dialog.Title>
              <Dialog.Description className="mt-2 mb-4 text-sm text-gray-500">
                Modifiez votre tâche ci-dessous.
              </Dialog.Description>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleEdit}>Modifier</Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}