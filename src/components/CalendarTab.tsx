'use client'

import { useState, useEffect } from 'react'
import { Plus, Clock, MapPin, Trash2, Edit3, Calendar as CalendarIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location?: string
  category: 'work' | 'personal' | 'health' | 'social' | 'other'
  createdAt: string
}

const eventCategories = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'personal', label: 'Personal', color: 'bg-green-500' },
  { value: 'health', label: 'Health', color: 'bg-red-500' },
  { value: 'social', label: 'Social', color: 'bg-purple-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' }
]

export default function CalendarTab() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddForm, setShowAddForm] = useState(false)
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    category: 'personal' as Event['category']
  })

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('events')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const addEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error('Please enter an event title')
      return
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category,
      createdAt: new Date().toISOString()
    }

    setEvents([...events, event])
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      location: '',
      category: 'personal'
    })
    setShowAddForm(false)
    toast.success('Event added successfully!')
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
    toast.success('Event deleted!')
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0]
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time)
        }
        return a.date.localeCompare(b.date)
      })
      .slice(0, 5)
  }

  const generateWeekDates = () => {
    const current = new Date(selectedDate)
    const week = []
    
    // Start from Monday
    const startOfWeek = new Date(current)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      week.push(date.toISOString().split('T')[0])
    }
    
    return week
  }

  const categoryColors = {
    work: 'bg-blue-100 text-blue-800 border-blue-200',
    personal: 'bg-green-100 text-green-800 border-green-200',
    health: 'bg-red-100 text-red-800 border-red-200',
    social: 'bg-purple-100 text-purple-800 border-purple-200',
    other: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-600">{events.length} events scheduled</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  viewMode === mode 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>
      </div>

      {/* Add Event Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description (optional)"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="textarea-field h-24"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="input-field"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="input-field"
              />
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as Event['category'] })}
                className="input-field"
              >
                {eventCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Location (optional)"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="input-field"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="btn-primary"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar View */}
        <div className="lg:col-span-2">
          {viewMode === 'week' && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Week View</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field w-auto"
                />
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                    {day}
                  </div>
                ))}
                {generateWeekDates().map(date => {
                  const dayEvents = getEventsForDate(date)
                  const dateObj = new Date(date)
                  const isToday = date === new Date().toISOString().split('T')[0]
                  
                  return (
                    <div key={date} className="min-h-[120px] border border-gray-200 rounded-lg p-2">
                      <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary-600' : 'text-gray-700'}`}>
                        {dateObj.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${categoryColors[event.category]}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            {event.time && (
                              <div className="text-xs opacity-75">{event.time}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {viewMode === 'day' && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Day View</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field w-auto"
                />
              </div>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(event => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            {event.description && (
                              <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              {event.time && (
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {event.time}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs rounded border ${categoryColors[event.category]}`}>
                              {event.category}
                            </span>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No events scheduled for this day
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Events */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {getUpcomingEvents().length > 0 ? (
                getUpcomingEvents().map(event => (
                  <div key={event.id} className="border-l-4 border-primary-500 pl-3 py-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Events:</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">This Week:</span>
                <span className="font-medium">
                  {events.filter(event => {
                    const eventDate = new Date(event.date)
                    const weekStart = new Date()
                    const weekEnd = new Date()
                    weekEnd.setDate(weekStart.getDate() + 7)
                    return eventDate >= weekStart && eventDate <= weekEnd
                  }).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Today:</span>
                <span className="font-medium">
                  {getEventsForDate(new Date().toISOString().split('T')[0]).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No events scheduled</h3>
          <p className="text-gray-500 mb-6">Start organizing your time by adding your first event!</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Your First Event
          </button>
        </div>
      )}
    </div>
  )
}
