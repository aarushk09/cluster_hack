'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, Clock, Flag, CheckSquare } from 'lucide-react'
import toast from 'react-hot-toast'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
}

export default function TasksTab() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: ''
  })

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Please enter a task title')
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate || undefined,
      createdAt: new Date().toISOString()
    }

    setTasks([...tasks, task])
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' })
    setShowAddForm(false)
    toast.success('Task added successfully!')
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
    toast.success('Task deleted!')
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600">
            {incompleteTasks.length} pending • {completedTasks.length} completed
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="textarea-field h-24"
            />
            <div className="flex gap-4">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="input-field flex-1"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="input-field flex-1"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="btn-primary"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Tasks */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Clock size={20} />
            Pending Tasks
          </h3>
          <div className="space-y-3">
            {incompleteTasks.map((task) => (
              <div key={task.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5 border-2 border-gray-300 rounded hover:border-primary-500 transition-colors"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        <Flag size={12} className="inline mr-1" />
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Check size={20} />
            Completed Tasks
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="card opacity-60 hover:opacity-80 transition-opacity">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5 bg-green-500 border-2 border-green-500 rounded flex items-center justify-center"
                  >
                    <Check size={14} className="text-white" />
                  </button>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-through">{task.title}</h4>
                    {task.description && (
                      <p className="text-gray-600 text-sm mt-1 line-through">{task.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
          <p className="text-gray-500 mb-6">Get organized by adding your first task!</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Your First Task
          </button>
        </div>
      )}
    </div>
  )
}
