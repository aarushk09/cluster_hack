'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Edit3, Save, X, Tag } from 'lucide-react'
import toast from 'react-hot-toast'

interface Note {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const categories = ['Personal', 'Work', 'Ideas', 'Learning', 'Projects', 'Other']

export default function NotesTab() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'Personal',
    tags: ''
  })

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!newNote.title.trim()) {
      toast.error('Please enter a note title')
      return
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setNotes([note, ...notes])
    setNewNote({ title: '', content: '', category: 'Personal', tags: '' })
    setShowAddForm(false)
    toast.success('Note added successfully!')
  }

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ))
    setEditingNote(null)
    toast.success('Note updated!')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    toast.success('Note deleted!')
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Notes</h2>
          <p className="text-gray-600">{notes.length} notes</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Note
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field sm:w-48"
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Note</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="textarea-field h-32"
            />
            <div className="flex gap-4">
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="input-field flex-1"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
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
                onClick={addNote}
                className="btn-primary"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isEditing={editingNote === note.id}
              onEdit={() => setEditingNote(note.id)}
              onSave={(updatedNote) => updateNote(note.id, updatedNote)}
              onCancel={() => setEditingNote(null)}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Edit3 size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            {searchTerm || selectedCategory !== 'All' ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'All' 
              ? 'Try adjusting your search or filter'
              : 'Start capturing your thoughts and ideas!'
            }
          </p>
          {!searchTerm && selectedCategory === 'All' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              Add Your First Note
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Note Card Component
function NoteCard({ 
  note, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}: {
  note: Note
  isEditing: boolean
  onEdit: () => void
  onSave: (note: Partial<Note>) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
    category: note.category,
    tags: note.tags.join(', ')
  })

  const handleSave = () => {
    onSave({
      title: editedNote.title,
      content: editedNote.content,
      category: editedNote.category,
      tags: editedNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    })
  }

  if (isEditing) {
    return (
      <div className="card">
        <div className="space-y-3">
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            className="input-field text-sm"
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
            className="textarea-field h-24 text-sm"
          />
          <div className="flex gap-2">
            <select
              value={editedNote.category}
              onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value })}
              className="input-field text-xs flex-1"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              value={editedNote.tags}
              onChange={(e) => setEditedNote({ ...editedNote, tags: e.target.value })}
              placeholder="Tags"
              className="input-field text-xs flex-1"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={onCancel} className="p-1 text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
            <button onClick={handleSave} className="p-1 text-green-500 hover:text-green-700">
              <Save size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{note.title}</h3>
          <div className="flex gap-1 ml-2">
            <button
              onClick={onEdit}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-4">{note.content}</p>
        
        <div className="space-y-2">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {note.category}
          </span>
          
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
