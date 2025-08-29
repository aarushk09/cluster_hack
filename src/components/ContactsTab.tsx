'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, User, Mail, Phone, MapPin, Trash2, Edit3, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  company?: string
  position?: string
  notes?: string
  category: string
  avatar?: string
  createdAt: string
}

const contactCategories = ['Family', 'Friends', 'Work', 'Business', 'Service Providers', 'Other']

export default function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContact, setEditingContact] = useState<string | null>(null)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    position: '',
    notes: '',
    category: 'Friends'
  })

  // Load contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = () => {
    if (!newContact.name.trim()) {
      toast.error('Please enter a name')
      return
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      email: newContact.email || undefined,
      phone: newContact.phone || undefined,
      address: newContact.address || undefined,
      company: newContact.company || undefined,
      position: newContact.position || undefined,
      notes: newContact.notes || undefined,
      category: newContact.category,
      createdAt: new Date().toISOString()
    }

    setContacts([...contacts, contact])
    setNewContact({
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      position: '',
      notes: '',
      category: 'Friends'
    })
    setShowAddForm(false)
    toast.success('Contact added successfully!')
  }

  const updateContact = (id: string, updatedContact: Partial<Contact>) => {
    setContacts(contacts.map(contact => 
      contact.id === id 
        ? { ...contact, ...updatedContact }
        : contact
    ))
    setEditingContact(null)
    toast.success('Contact updated!')
  }

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
    toast.success('Contact deleted!')
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || contact.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contacts</h2>
          <p className="text-gray-600">{contacts.length} contacts</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Contact
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
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
          {contactCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full name *"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="input-field"
              />
              <select
                value={newContact.category}
                onChange={(e) => setNewContact({ ...newContact, category: e.target.value })}
                className="input-field"
              >
                {contactCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="input-field"
              />
            </div>
            
            <input
              type="text"
              placeholder="Address"
              value={newContact.address}
              onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              className="input-field"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                value={newContact.company}
                onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Position"
                value={newContact.position}
                onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                className="input-field"
              />
            </div>
            
            <textarea
              placeholder="Notes"
              value={newContact.notes}
              onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
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
                onClick={addContact}
                className="btn-primary"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isEditing={editingContact === contact.id}
              onEdit={() => setEditingContact(contact.id)}
              onSave={(updatedContact) => updateContact(contact.id, updatedContact)}
              onCancel={() => setEditingContact(null)}
              onDelete={() => deleteContact(contact.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            {searchTerm || selectedCategory !== 'All' ? 'No contacts found' : 'No contacts yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search or filter'
              : 'Start building your contact list!'
            }
          </p>
          {!searchTerm && selectedCategory === 'All' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              Add Your First Contact
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Contact Card Component
function ContactCard({ 
  contact, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}: {
  contact: Contact
  isEditing: boolean
  onEdit: () => void
  onSave: (contact: Partial<Contact>) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editedContact, setEditedContact] = useState({
    name: contact.name,
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    company: contact.company || '',
    position: contact.position || '',
    notes: contact.notes || '',
    category: contact.category
  })

  const handleSave = () => {
    onSave({
      name: editedContact.name,
      email: editedContact.email || undefined,
      phone: editedContact.phone || undefined,
      address: editedContact.address || undefined,
      company: editedContact.company || undefined,
      position: editedContact.position || undefined,
      notes: editedContact.notes || undefined,
      category: editedContact.category
    })
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (isEditing) {
    return (
      <div className="card">
        <div className="space-y-3">
          <input
            type="text"
            value={editedContact.name}
            onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
            className="input-field text-sm"
            placeholder="Name"
          />
          <input
            type="email"
            value={editedContact.email}
            onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
            className="input-field text-sm"
            placeholder="Email"
          />
          <input
            type="tel"
            value={editedContact.phone}
            onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
            className="input-field text-sm"
            placeholder="Phone"
          />
          <select
            value={editedContact.category}
            onChange={(e) => setEditedContact({ ...editedContact, category: e.target.value })}
            className="input-field text-sm"
          >
            {contactCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
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
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
              {getInitials(contact.name)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              {contact.company && (
                <p className="text-sm text-gray-600">{contact.position ? `${contact.position} at ` : ''}{contact.company}</p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
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

        <div className="space-y-2">
          {contact.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} />
              <a href={`mailto:${contact.email}`} className="hover:text-primary-600">
                {contact.email}
              </a>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} />
              <a href={`tel:${contact.phone}`} className="hover:text-primary-600">
                {contact.phone}
              </a>
            </div>
          )}
          {contact.address && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{contact.address}</span>
            </div>
          )}
        </div>

        {contact.notes && (
          <p className="text-sm text-gray-600 line-clamp-2">{contact.notes}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {contact.category}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(contact.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}
