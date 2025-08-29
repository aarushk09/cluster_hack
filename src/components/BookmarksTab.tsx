'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Bookmark, ExternalLink, Trash2, Edit3, Save, X, Tag, Folder } from 'lucide-react'
import toast from 'react-hot-toast'

interface BookmarkItem {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  favicon?: string
  createdAt: string
  folderId?: string
}

interface BookmarkFolder {
  id: string
  name: string
  color: string
  createdAt: string
}

const defaultCategories = ['Work', 'Learning', 'Entertainment', 'News', 'Tools', 'Social', 'Shopping', 'Other']
const folderColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-gray-500']

export default function BookmarksTab() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
  const [folders, setFolders] = useState<BookmarkFolder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddFolder, setShowAddFolder] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null)
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    description: '',
    category: 'Work',
    tags: '',
    folderId: ''
  })
  const [newFolder, setNewFolder] = useState({
    name: '',
    color: folderColors[0]
  })

  // Load data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks')
    const savedFolders = localStorage.getItem('bookmarkFolders')
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks))
    if (savedFolders) setFolders(JSON.parse(savedFolders))
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem('bookmarkFolders', JSON.stringify(folders))
  }, [folders])

  const addBookmark = () => {
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) {
      toast.error('Please enter title and URL')
      return
    }

    const bookmark: BookmarkItem = {
      id: Date.now().toString(),
      title: newBookmark.title,
      url: newBookmark.url,
      description: newBookmark.description || undefined,
      category: newBookmark.category,
      tags: newBookmark.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(newBookmark.url).hostname}`,
      createdAt: new Date().toISOString(),
      folderId: newBookmark.folderId || undefined
    }

    setBookmarks([bookmark, ...bookmarks])
    setNewBookmark({
      title: '',
      url: '',
      description: '',
      category: 'Work',
      tags: '',
      folderId: ''
    })
    setShowAddForm(false)
    toast.success('Bookmark added successfully!')
  }

  const addFolder = () => {
    if (!newFolder.name.trim()) {
      toast.error('Please enter folder name')
      return
    }

    const folder: BookmarkFolder = {
      id: Date.now().toString(),
      name: newFolder.name,
      color: newFolder.color,
      createdAt: new Date().toISOString()
    }

    setFolders([...folders, folder])
    setNewFolder({
      name: '',
      color: folderColors[0]
    })
    setShowAddFolder(false)
    toast.success('Folder added successfully!')
  }

  const updateBookmark = (id: string, updatedBookmark: Partial<BookmarkItem>) => {
    setBookmarks(bookmarks.map(bookmark => 
      bookmark.id === id 
        ? { 
          ...bookmark, 
          ...updatedBookmark
        }
        : bookmark
    ))
    setEditingBookmark(null)
    toast.success('Bookmark updated!')
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
    toast.success('Bookmark deleted!')
  }

  const deleteFolder = (id: string) => {
    // Move bookmarks out of folder
    setBookmarks(bookmarks.map(bookmark => 
      bookmark.folderId === id 
        ? { ...bookmark, folderId: undefined }
        : bookmark
    ))
    setFolders(folders.filter(folder => folder.id !== id))
    if (selectedFolder === id) setSelectedFolder(null)
    toast.success('Folder deleted!')
  }

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bookmark.description && bookmark.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || bookmark.category === selectedCategory
    const matchesFolder = selectedFolder === null || bookmark.folderId === selectedFolder
    return matchesSearch && matchesCategory && matchesFolder
  })

  const getBookmarksByFolder = (folderId: string | undefined) => {
    return bookmarks.filter(bookmark => bookmark.folderId === folderId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bookmarks</h2>
          <p className="text-gray-600">{bookmarks.length} bookmarks in {folders.length} folders</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddFolder(true)}
            className="btn-secondary"
          >
            <Folder size={20} />
            Add Folder
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            Add Bookmark
          </button>
        </div>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Folders</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFolder === null
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Bookmarks ({bookmarks.length})
            </button>
            {folders.map(folder => (
              <div key={folder.id} className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedFolder === folder.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-3 h-3 rounded ${folder.color}`} />
                  {folder.name} ({getBookmarksByFolder(folder.id).length})
                </button>
                <button
                  onClick={() => deleteFolder(folder.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookmarks..."
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
          {defaultCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add Folder Form */}
      {showAddFolder && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Folder</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Folder name"
              value={newFolder.name}
              onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
              className="input-field"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Color</label>
              <div className="flex gap-2">
                {folderColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setNewFolder({ ...newFolder, color })}
                    className={`w-8 h-8 rounded ${color} ${
                      newFolder.color === color ? 'ring-2 ring-gray-400' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddFolder(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addFolder}
                className="btn-primary"
              >
                Add Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Bookmark Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Bookmark</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bookmark title"
                value={newBookmark.title}
                onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                className="input-field"
              />
              <input
                type="url"
                placeholder="https://example.com"
                value={newBookmark.url}
                onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                className="input-field"
              />
            </div>
            
            <textarea
              placeholder="Description (optional)"
              value={newBookmark.description}
              onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
              className="textarea-field h-24"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newBookmark.category}
                onChange={(e) => setNewBookmark({ ...newBookmark, category: e.target.value })}
                className="input-field"
              >
                {defaultCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={newBookmark.folderId}
                onChange={(e) => setNewBookmark({ ...newBookmark, folderId: e.target.value })}
                className="input-field"
              >
                <option value="">No folder</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>
            
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newBookmark.tags}
              onChange={(e) => setNewBookmark({ ...newBookmark, tags: e.target.value })}
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
                onClick={addBookmark}
                className="btn-primary"
              >
                Add Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map(bookmark => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              folders={folders}
              isEditing={editingBookmark === bookmark.id}
              onEdit={() => setEditingBookmark(bookmark.id)}
              onSave={(updatedBookmark) => updateBookmark(bookmark.id, updatedBookmark)}
              onCancel={() => setEditingBookmark(null)}
              onDelete={() => deleteBookmark(bookmark.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            {searchTerm || selectedCategory !== 'All' || selectedFolder 
              ? 'No bookmarks found' 
              : 'No bookmarks yet'
            }
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'All' || selectedFolder
              ? 'Try adjusting your search or filter'
              : 'Start organizing your favorite websites!'
            }
          </p>
          {!searchTerm && selectedCategory === 'All' && !selectedFolder && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              Add Your First Bookmark
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Bookmark Card Component
function BookmarkCard({ 
  bookmark, 
  folders,
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}: {
  bookmark: BookmarkItem
  folders: BookmarkFolder[]
  isEditing: boolean
  onEdit: () => void
  onSave: (bookmark: Partial<BookmarkItem>) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editedBookmark, setEditedBookmark] = useState({
    title: bookmark.title,
    url: bookmark.url,
    description: bookmark.description || '',
    category: bookmark.category,
    tags: bookmark.tags.join(', '),
    folderId: bookmark.folderId || ''
  })

  const handleSave = () => {
    onSave({
      title: editedBookmark.title,
      url: editedBookmark.url,
      description: editedBookmark.description || undefined,
      category: editedBookmark.category,
      tags: editedBookmark.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      folderId: editedBookmark.folderId || undefined
    })
  }

  const folder = folders.find(f => f.id === bookmark.folderId)

  if (isEditing) {
    return (
      <div className="card">
        <div className="space-y-3">
          <input
            type="text"
            value={editedBookmark.title}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, title: e.target.value })}
            className="input-field text-sm"
            placeholder="Title"
          />
          <input
            type="url"
            value={editedBookmark.url}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, url: e.target.value })}
            className="input-field text-sm"
            placeholder="URL"
          />
          <textarea
            value={editedBookmark.description}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, description: e.target.value })}
            className="textarea-field text-sm h-16"
            placeholder="Description"
          />
          <div className="flex gap-2">
            <select
              value={editedBookmark.category}
              onChange={(e) => setEditedBookmark({ ...editedBookmark, category: e.target.value })}
              className="input-field text-xs flex-1"
            >
              {defaultCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={editedBookmark.folderId}
              onChange={(e) => setEditedBookmark({ ...editedBookmark, folderId: e.target.value })}
              className="input-field text-xs flex-1"
            >
              <option value="">No folder</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={editedBookmark.tags}
            onChange={(e) => setEditedBookmark({ ...editedBookmark, tags: e.target.value })}
            placeholder="Tags"
            className="input-field text-xs"
          />
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
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {bookmark.favicon && (
              <img 
                src={bookmark.favicon} 
                alt="" 
                className="w-4 h-4 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">{bookmark.title}</h3>
              <a 
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 truncate block"
              >
                {bookmark.url}
              </a>
            </div>
          </div>
          <div className="flex gap-1 ml-2">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
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
        
        {bookmark.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{bookmark.description}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {bookmark.category}
            </span>
            {folder && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                <div className={`w-2 h-2 rounded ${folder.color}`} />
                {folder.name}
              </span>
            )}
          </div>
          
          {bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {bookmark.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
              {bookmark.tags.length > 3 && (
                <span className="text-xs text-gray-400">+{bookmark.tags.length - 3} more</span>
              )}
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {new Date(bookmark.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
