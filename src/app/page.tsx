'use client'

// import { useState } from 'react' // Will be needed when we add navigation
import { 
  CheckSquare, 
  // Future icons (will be imported when needed):
  // StickyNote, 
  // Calendar, 
  // Target, 
  // FolderOpen, 
  // Users, 
  // DollarSign, 
  // Bookmark,
  // Menu,
  // X
} from 'lucide-react'

// Import only the Tasks component for now
import TasksTab from '@/components/TasksTab'
// Future features (will be added in subsequent commits):
// import NotesTab from '@/components/NotesTab'
// import CalendarTab from '@/components/CalendarTab'
// import GoalsTab from '@/components/GoalsTab'
// import FilesTab from '@/components/FilesTab'
// import ContactsTab from '@/components/ContactsTab'
// import FinanceTab from '@/components/FinanceTab'
// import BookmarksTab from '@/components/BookmarksTab'

const tabs = [
  { id: 'tasks', name: 'Tasks', icon: CheckSquare, component: TasksTab },
  // Future features (will be enabled in subsequent commits):
  // { id: 'notes', name: 'Notes', icon: StickyNote, component: NotesTab },
  // { id: 'calendar', name: 'Calendar', icon: Calendar, component: CalendarTab },
  // { id: 'goals', name: 'Goals', icon: Target, component: GoalsTab },
  // { id: 'files', name: 'Files', icon: FolderOpen, component: FilesTab },
  // { id: 'contacts', name: 'Contacts', icon: Users, component: ContactsTab },
  // { id: 'finance', name: 'Finance', icon: DollarSign, component: FinanceTab },
  // { id: 'bookmarks', name: 'Bookmarks', icon: Bookmark, component: BookmarksTab },
]

export default function Home() {
  // State variables for future features (will be uncommented when we add navigation)
  // const [activeTab, setActiveTab] = useState('tasks')
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  // const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || TasksTab

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {/* Mobile menu button will be added when we have multiple features */}
              {/* 
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Digital Life Organizer
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - Full width since we only have Tasks for now */}
        <div className="animate-fade-in">
          <TasksTab />
        </div>
        
        {/* Future: Sidebar Navigation will be added when we have multiple features */}
        {/* 
        <div className="flex gap-8">
          <div className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 lg:border-0 lg:bg-transparent transition-transform duration-300 ease-in-out
          `}>
            <div className="h-full overflow-y-auto pt-20 lg:pt-0">
              <nav className="space-y-2 p-4 lg:p-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setSidebarOpen(false)
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left
                        ${activeTab === tab.id 
                          ? 'tab-active' 
                          : 'tab-inactive'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="flex-1 min-w-0">
            <div className="animate-fade-in">
              <ActiveComponent />
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  )
}
