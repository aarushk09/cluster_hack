'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Folder, File, Download, Trash2, Upload, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: string
  url?: string
  category: string
  description?: string
  createdAt: string
  parentId?: string
}

const fileCategories = ['Documents', 'Images', 'Videos', 'Audio', 'Archives', 'Other']

export default function FilesTab() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'file' as FileItem['type'],
    url: '',
    category: 'Documents',
    description: ''
  })

  // Load files from localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem('files')
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles))
    }
  }, [])

  // Save files to localStorage
  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files))
  }, [files])

  const addItem = () => {
    if (!newItem.name.trim()) {
      toast.error('Please enter a name')
      return
    }

    const item: FileItem = {
      id: Date.now().toString(),
      name: newItem.name,
      type: newItem.type,
      url: newItem.url || undefined,
      category: newItem.category,
      description: newItem.description || undefined,
      createdAt: new Date().toISOString(),
      parentId: currentFolder || undefined,
      size: newItem.type === 'file' ? 'Unknown' : undefined
    }

    setFiles([...files, item])
    setNewItem({ name: '', type: 'file', url: '', category: 'Documents', description: '' })
    setShowAddForm(false)
    toast.success(`${newItem.type === 'folder' ? 'Folder' : 'File'} added successfully!`)
  }

  const deleteItem = (id: string) => {
    // Also delete all items inside if it's a folder
    const itemsToDelete = [id]
    const findChildItems = (parentId: string) => {
      files.forEach(file => {
        if (file.parentId === parentId) {
          itemsToDelete.push(file.id)
          if (file.type === 'folder') {
            findChildItems(file.id)
          }
        }
      })
    }
    
    const item = files.find(f => f.id === id)
    if (item?.type === 'folder') {
      findChildItems(id)
    }
    
    setFiles(files.filter(file => !itemsToDelete.includes(file.id)))
    toast.success('Item deleted!')
  }

  const getCurrentFolderItems = () => {
    return files.filter(file => file.parentId === currentFolder)
  }

  const filteredItems = getCurrentFolderItems().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getBreadcrumb = () => {
    const breadcrumb = []
    let current = currentFolder
    
    while (current) {
      const folder = files.find(f => f.id === current)
      if (folder) {
        breadcrumb.unshift(folder)
        current = folder.parentId || null
      } else {
        break
      }
    }
    
    return breadcrumb
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Files & Documents</h2>
          <p className="text-gray-600">{files.length} items total</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      {(currentFolder || getBreadcrumb().length > 0) && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => setCurrentFolder(null)}
            className="hover:text-primary-600 transition-colors"
          >
            Root
          </button>
          {getBreadcrumb().map((folder, index) => (
            <div key={folder.id} className="flex items-center gap-2">
              <span>/</span>
              <button
                onClick={() => setCurrentFolder(folder.id)}
                className="hover:text-primary-600 transition-colors"
              >
                {folder.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
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
          {fileCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="file"
                  checked={newItem.type === 'file'}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as FileItem['type'] })}
                  className="text-primary-600"
                />
                <span>File</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="folder"
                  checked={newItem.type === 'folder'}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as FileItem['type'] })}
                  className="text-primary-600"
                />
                <span>Folder</span>
              </label>
            </div>
            
            <input
              type="text"
              placeholder={`${newItem.type === 'folder' ? 'Folder' : 'File'} name`}
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="input-field"
            />
            
            {newItem.type === 'file' && (
              <input
                type="url"
                placeholder="File URL or path (optional)"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                className="input-field"
              />
            )}
            
            <div className="flex gap-4">
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="input-field flex-1"
              >
                {fileCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <textarea
              placeholder="Description (optional)"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="textarea-field h-24"
            />
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="btn-primary"
              >
                Add {newItem.type === 'folder' ? 'Folder' : 'File'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => item.type === 'folder' ? setCurrentFolder(item.id) : null}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {item.type === 'folder' ? (
                    <Folder size={32} className="text-blue-500" />
                  ) : (
                    <File size={32} className="text-gray-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm truncate">{item.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                    {item.size && <span>{item.size}</span>}
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.type === 'file' && item.url && (
                    <>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View file"
                      >
                        <Eye size={16} />
                      </a>
                      <a
                        href={item.url}
                        download={item.name}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                        title="Download"
                      >
                        <Download size={16} />
                      </a>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteItem(item.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Folder size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            {searchTerm || selectedCategory !== 'All' ? 'No items found' : 'No files or folders yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter'
              : 'Start organizing your digital files!'
            }
          </p>
          {!searchTerm && selectedCategory === 'All' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              Add Your First Item
            </button>
          )}
        </div>
      )}
    </div>
  )
}
