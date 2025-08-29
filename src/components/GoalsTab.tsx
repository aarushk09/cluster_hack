'use client'

import { useState, useEffect } from 'react'
import { Plus, Target, TrendingUp, Calendar, CheckCircle, Circle, Flame } from 'lucide-react'
import toast from 'react-hot-toast'

interface Goal {
  id: string
  title: string
  description: string
  type: 'goal' | 'habit'
  category: string
  targetValue?: number
  currentValue: number
  unit?: string
  deadline?: string
  completed: boolean
  createdAt: string
  streak?: number
  lastCompletedDate?: string
}

const goalCategories = ['Health', 'Career', 'Personal', 'Financial', 'Learning', 'Relationships', 'Other']

export default function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'goals' | 'habits'>('all')
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'goal' as Goal['type'],
    category: 'Personal',
    targetValue: '',
    unit: '',
    deadline: ''
  })

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {
    if (!newGoal.title.trim()) {
      toast.error('Please enter a goal title')
      return
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      category: newGoal.category,
      targetValue: newGoal.targetValue ? Number(newGoal.targetValue) : undefined,
      currentValue: 0,
      unit: newGoal.unit || undefined,
      deadline: newGoal.deadline || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      streak: newGoal.type === 'habit' ? 0 : undefined
    }

    setGoals([...goals, goal])
    setNewGoal({
      title: '',
      description: '',
      type: 'goal',
      category: 'Personal',
      targetValue: '',
      unit: '',
      deadline: ''
    })
    setShowAddForm(false)
    toast.success(`${newGoal.type === 'goal' ? 'Goal' : 'Habit'} added successfully!`)
  }

  const updateProgress = (id: string, value: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedGoal = { ...goal, currentValue: value }
        
        // Check if goal is completed
        if (goal.targetValue && value >= goal.targetValue && !goal.completed) {
          updatedGoal.completed = true
          toast.success(`Goal "${goal.title}" completed! 🎉`)
        }
        
        return updatedGoal
      }
      return goal
    }))
  }

  const completeHabitToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0]
    
    setGoals(goals.map(goal => {
      if (goal.id === id && goal.type === 'habit') {
        const isConsecutiveDay = goal.lastCompletedDate === 
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        
        return {
          ...goal,
          currentValue: goal.currentValue + 1,
          lastCompletedDate: today,
          streak: isConsecutiveDay ? (goal.streak || 0) + 1 : 1
        }
      }
      return goal
    }))
    
    toast.success('Habit completed for today! 🔥')
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
    toast.success('Goal deleted!')
  }

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true
    return goal.type === filter.slice(0, -1) // Remove 's' from 'goals'/'habits'
  })

  const completedGoals = goals.filter(goal => goal.completed).length
  const activeGoals = goals.filter(goal => !goal.completed && goal.type === 'goal').length
  const activeHabits = goals.filter(goal => goal.type === 'habit').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Goals & Habits</h2>
          <p className="text-gray-600">
            {activeGoals} active goals • {activeHabits} habits • {completedGoals} completed
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Goal/Habit
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        {(['all', 'goals', 'habits'] as const).map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              filter === filterOption
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Goal/Habit Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Goal/Habit</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="goal"
                  checked={newGoal.type === 'goal'}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal['type'] })}
                  className="text-primary-600"
                />
                <span>Goal</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="habit"
                  checked={newGoal.type === 'habit'}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as Goal['type'] })}
                  className="text-primary-600"
                />
                <span>Habit</span>
              </label>
            </div>
            
            <input
              type="text"
              placeholder={`${newGoal.type === 'goal' ? 'Goal' : 'Habit'} title`}
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="input-field"
            />
            
            <textarea
              placeholder="Description (optional)"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="textarea-field h-24"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="input-field"
              >
                {goalCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              {newGoal.type === 'goal' && (
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="input-field"
                  placeholder="Deadline (optional)"
                />
              )}
            </div>
            
            <div className="flex gap-4">
              <input
                type="number"
                placeholder={newGoal.type === 'goal' ? 'Target value (optional)' : 'Daily target (optional)'}
                value={newGoal.targetValue}
                onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                className="input-field flex-1"
              />
              <input
                type="text"
                placeholder="Unit (e.g., kg, hours, times)"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
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
                onClick={addGoal}
                className="btn-primary"
              >
                Add {newGoal.type === 'goal' ? 'Goal' : 'Habit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals/Habits List */}
      {filteredGoals.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdateProgress={updateProgress}
              onCompleteHabit={completeHabitToday}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Target size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No {filter === 'all' ? 'goals or habits' : filter} yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start building better habits and achieving your goals!
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Your First {filter === 'all' ? 'Goal' : filter.slice(0, -1)}
          </button>
        </div>
      )}
    </div>
  )
}

// Goal Card Component
function GoalCard({ 
  goal, 
  onUpdateProgress, 
  onCompleteHabit, 
  onDelete 
}: {
  goal: Goal
  onUpdateProgress: (id: string, value: number) => void
  onCompleteHabit: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [progressInput, setProgressInput] = useState('')
  
  const progressPercentage = goal.targetValue 
    ? Math.min((goal.currentValue / goal.targetValue) * 100, 100)
    : 0

  const isHabitCompletedToday = goal.type === 'habit' && 
    goal.lastCompletedDate === new Date().toISOString().split('T')[0]

  const handleProgressUpdate = () => {
    const value = Number(progressInput)
    if (!isNaN(value) && value >= 0) {
      onUpdateProgress(goal.id, value)
      setProgressInput('')
    }
  }

  return (
    <div className={`card ${goal.completed ? 'opacity-75' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {goal.type === 'goal' ? (
                <Target size={16} className="text-blue-500" />
              ) : (
                <Circle size={16} className="text-green-500" />
              )}
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {goal.category}
              </span>
            </div>
            <h3 className={`font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-gray-600 text-sm mt-1">{goal.description}</p>
            )}
          </div>
          <button
            onClick={() => onDelete(goal.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Progress */}
        {goal.targetValue && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Habit Streak */}
        {goal.type === 'habit' && goal.streak !== undefined && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Flame size={16} />
            <span>{goal.streak} day streak</span>
          </div>
        )}

        {/* Deadline */}
        {goal.deadline && !goal.completed && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
        )}

        {/* Actions */}
        {!goal.completed && (
          <div className="pt-2 border-t border-gray-100">
            {goal.type === 'habit' ? (
              <button
                onClick={() => onCompleteHabit(goal.id)}
                disabled={isHabitCompletedToday}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  isHabitCompletedToday
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {isHabitCompletedToday ? (
                  <>
                    <CheckCircle size={16} className="inline mr-2" />
                    Completed Today
                  </>
                ) : (
                  'Mark as Done Today'
                )}
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={`Current progress${goal.unit ? ` (${goal.unit})` : ''}`}
                  value={progressInput}
                  onChange={(e) => setProgressInput(e.target.value)}
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={handleProgressUpdate}
                  className="btn-primary text-sm"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        )}

        {/* Completed Badge */}
        {goal.completed && (
          <div className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-700 rounded-lg">
            <CheckCircle size={16} />
            <span className="font-medium">Completed!</span>
          </div>
        )}
      </div>
    </div>
  )
}
